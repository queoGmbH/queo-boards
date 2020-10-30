import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { Router } from '@angular/router';

import { IBoardSummary } from '../../../../core/interfaces/board-summary.interface';

@Component({
  selector: 'boards-board-link',
  templateUrl: './board-link.component.html',
  styleUrls: ['./board-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardLinkComponent implements OnInit {
  private _disableButton = false;

  @Input()
  boardSummary: IBoardSummary;

  @Input()
  get disableButton() {
    return this._disableButton;
  }

  set disableButton(value: boolean) {
    this._disableButton = value || false;
  }

  @Output()
  openCreateBoardDialog = new EventEmitter();

  constructor(private router: Router) {}

  ngOnInit() {}

  onOpenCreateBoardDialog() {
    this.openCreateBoardDialog.emit();
  }

  navigateToBoard() {
    this.router.navigate(['/board', this.boardSummary.businessId]);
  }
}
