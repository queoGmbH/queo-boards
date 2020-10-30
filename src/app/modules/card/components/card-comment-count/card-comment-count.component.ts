import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'boards-card-comment-count',
  templateUrl: './card-comment-count.component.html',
  styleUrls: ['./card-comment-count.component.scss']
})
export class CardCommentCountComponent implements OnInit {
  @Input()
  cardCommentCount: number;

  constructor() {}

  ngOnInit() {}
}
