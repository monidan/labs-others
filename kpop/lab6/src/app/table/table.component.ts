import { Component, OnInit } from '@angular/core';

import { WeatherService } from '../weather.service';
import { WeatherResponse } from '../interfaces/Responses';
import { FavoritesService } from '../favorites.service';

import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';

interface WeatherResponseExtended extends WeatherResponse {
  isFavorite: boolean;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {

  weather: WeatherResponseExtended[] = [];
  columnsToDisplay: string[] = ['Город', 'Температура (°C)', 'Влажность', 'Видимость', 'Описание погоды'];

  constructor(
    private weatherService: WeatherService,
    private favoritesService: FavoritesService,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    this.weatherService.getWeather()
      .then((weatherData: WeatherResponse[]) => this.weather = weatherData.map(w => {
        return ({ ...w, isFavorite: this.isFavorite(w) })
      }))
      .then(_ => console.log('weather ->', this.weather))
  }

  addFavorite(favorite: WeatherResponseExtended) {
    this.favoritesService.addFavorite(favorite);
  }

  removeFavorite(favorite: WeatherResponseExtended) {
    this.favoritesService.removeFavorite(favorite);
  }

  isFavorite(element) {
    let isFavoriteFlag = false;

    this.favoritesService.observableFavorites.subscribe(
      favorites => {
        favorites.find(favorite => {
          favorite.title === element.title
            ? isFavoriteFlag = true
            : isFavoriteFlag = false
        })
      }
    )
    return isFavoriteFlag;
  }

  async initModal(element) {
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: {
        'data': element
      }
    })

    return modal.present();
  }
}
