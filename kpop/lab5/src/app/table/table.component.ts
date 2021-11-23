import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import {
  MatDialog,
} from '@angular/material/dialog';

import { Post, PostExtended } from '../interfaces/post';
import { DialogComponent } from '../dialog/dialog.component';
import { Posts } from '../services/posts.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  columnsToDisplay: string[] = ['postId', 'title', 'actions']
  posts: PostExtended[] = [];

  constructor(
    public dialog: MatDialog,
    private postsService: Posts
  ) {
    this.postsService.getFavorites().subscribe(favorites => console.log('favorites ->', favorites))
  }

  ngOnInit(): void {
    this.postsService.getPosts()
      .subscribe(posts => this.posts = posts.map(post => ({ ...post, isFavorite: false })));
  }

  openDialog(data: object) {
    let dialogRef = this.dialog.open(DialogComponent, {
      height: 'auto',
      width: '500px',
      data: data
    })
  }

  addFavorite(data: PostExtended) {
    this.postsService.addFavorite(data);
  }

  removeFavorite(data: PostExtended) {
    this.postsService.removeFavorite(data);
  }
}
