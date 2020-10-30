import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

import { IBoard } from '../../../../core/interfaces/board.interface';
import { IUser } from '../../../../core/interfaces/user.interface';

@Component({
  selector: 'boards-filter-member',
  templateUrl: './filter-member.component.html',
  styleUrls: ['./filter-member.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterMemberComponent implements OnInit {
  @Input()
  board: IBoard;
  @Input()
  selectedBoardUsers: IUser[];

  @Output()
  boardUserSelect = new EventEmitter<IUser[]>();

  constructor() {}

  ngOnInit() {}

  getSelectedBoardUser(boardUser: IUser) {
    return this.selectedBoardUsers.find((user: IUser) => {
      return user.businessId === boardUser.businessId;
    });
  }

  onBoardUserSelect(event: MatButtonToggleChange) {
    const selected = event.source.checked;
    const boardUser: IUser = event.value;

    if (selected) {
      this.selectedBoardUsers = [...this.selectedBoardUsers, boardUser];
    } else {
      this.selectedBoardUsers = [
        ...this.selectedBoardUsers.filter((user: IUser) => {
          return user.businessId !== boardUser.businessId;
        })
      ];
    }

    this.boardUserSelect.emit(this.selectedBoardUsers);
  }
}
