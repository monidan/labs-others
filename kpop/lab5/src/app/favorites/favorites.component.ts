import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange, ViewChild, AfterViewInit } from '@angular/core';
import { Posts } from '../services/posts.service';

import { Post, PostExtended } from '../interfaces/post';

import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit, AfterViewInit {

  favoritesData: PostExtended[] = [];
  columnsToDisplay: string[] = ['postId', 'title', 'actions'];

  @ViewChild(MatTable) table: MatTable<PostExtended>;

  constructor(private postsService: Posts) {
  }

  ngOnInit(): void {
    this.postsService.getFavorites().subscribe(favorites => this.favoritesData = favorites);
  }

  ngAfterViewInit(): void {
    this.postsService.getFavorites().subscribe(_ => this.table.renderRows())
  }

  addFavorite(data: PostExtended ){
    this.postsService.addFavorite(data);
    this.table.renderRows();
  }

  removeFavorite(data: PostExtended) {
    this.postsService.removeFavorite(data);
    this.table.renderRows();
  }

  ngOnChanges(changes: SimpleChange) {
    console.log(changes)
  }
}
