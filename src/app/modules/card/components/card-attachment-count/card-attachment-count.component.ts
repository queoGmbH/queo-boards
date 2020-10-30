import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'boards-card-attachment-count',
  templateUrl: './card-attachment-count.component.html',
  styleUrls: ['./card-attachment-count.component.scss']
})
export class CardAttachmentCountComponent implements OnInit {
  @Input()
  cardAttachmentCount: number;

  constructor() {}

  ngOnInit() {}
}
