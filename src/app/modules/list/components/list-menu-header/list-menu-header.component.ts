import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'boards-list-menu-header',
  templateUrl: './list-menu-header.component.html',
  styleUrls: ['./list-menu-header.component.scss']
})
export class ListMenuHeaderComponent implements OnInit {
  showMainMenu: boolean;

  @Input()
  menuTitle: string;

  @Output()
  closeMenu = new EventEmitter<MouseEvent>();
  @Output()
  mainMenu = new EventEmitter<MouseEvent>();

  constructor() {}

  ngOnInit() {
    this.showMainMenu = this.mainMenu.observers.length > 0;
  }

  onCloseMenu(event: MouseEvent) {
    event.stopPropagation();
    this.closeMenu.emit(event);
  }

  onShowMainMenu(event: MouseEvent) {
    event.stopPropagation();
    this.mainMenu.emit(event);
  }
}
