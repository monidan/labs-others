import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { WeatherResponse } from './interfaces/Responses';

import { Storage } from '@ionic/storage-angular';

interface Favorite extends WeatherResponse {
  isFavorite: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  favorites: Favorite[] = [];
  sharedFavorites = new BehaviorSubject(this.favorites);
  observableFavorites = this.sharedFavorites.asObservable();

  constructor(
    private storage: Storage
  ) {
    this.storage.create();
    this.sharedFavorites.next(this.favorites);
    const isFavoritesExist = this.storage.get('favorites')
      .then(storageFavorites => {
        if (storageFavorites) {
          this.favorites = storageFavorites
          this.sharedFavorites.next(this.favorites)
        }
      })
    ;
  }

  addFavorite(favorite: Favorite) {
    this.favorites.push(favorite);
    this.sharedFavorites.next(this.favorites);
    favorite.isFavorite = true;
    this.storage.set('favorites', this.favorites);
  }

  removeFavorite(favorite: Favorite) {
    this.favorites = this.favorites.filter(f => f !== favorite);
    this.sharedFavorites.next(this.favorites);
    favorite.isFavorite = false;
    this.storage.set('favorites', this.favorites);
  }
}
