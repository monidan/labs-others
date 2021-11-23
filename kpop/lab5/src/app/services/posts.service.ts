import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

import {
  Post,
  PostExtended
} from '../interfaces/post';

const API_URL = 'http://jsonplaceholder.typicode.com/posts';

@Injectable({
  providedIn: 'root',
})
export class Posts {
  favorites: PostExtended[] = [];
  sharedFavorites = new BehaviorSubject(this.favorites);
  favoritesObserver = this.sharedFavorites.asObservable();

  constructor(
    private http: HttpClient
  ) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(API_URL);
  }

  getFavorites(): Observable<PostExtended[]> {
    return this.favoritesObserver;
  }

  addFavorite(post: PostExtended) {
    this.favorites.push(post);
    this.sharedFavorites.next(this.favorites)
    post.isFavorite = true;
    console.log(this.favorites)
  }

  removeFavorite(post: PostExtended) {
    this.favorites = this.favorites.filter(favorite => favorite !== post);
    this.sharedFavorites.next(this.favorites)
    post.isFavorite = false;
  }
}
