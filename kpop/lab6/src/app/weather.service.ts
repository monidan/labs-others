import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { WeatherResponse } from './interfaces/Responses';

import { citiesData } from './cities.js';

const API_LINK = 'https://www.metaweather.com/api/'

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  cities: string[] = citiesData;
  weather: WeatherResponse[] = [];

  constructor(
    private http: HttpClient,
  ) {}

  getCoords() {
    return Promise.all(this.cities.map(city => this.http.get(`${API_LINK}/location/search/?query=${city}`).toPromise()));
  }

  getWeather() {
    return this.getCoords()
      .then(cities => Promise.all(cities.map(city => this.http.get(`${API_LINK}/location/${city[0].woeid}`).toPromise())))
      .then((weather: WeatherResponse[]) => this.weather = weather)
  }
}
