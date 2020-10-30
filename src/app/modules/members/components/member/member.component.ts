import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

import { IUser } from '../../../../core/interfaces/user.interface';

@Component({
  selector: 'boards-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberComponent implements OnInit {
  @Input()
  currentUser: IUser;
  // are we allowed to remove
  @Input()
  canRemove: boolean;
  // the member to display
  @Input()
  member: IUser;
  // all owners, i.e. allowed users that can change
  @Input()
  owners: IUser[];

  @Output()
  removeMember = new EventEmitter<IUser>();

  constructor() {}

  ngOnInit() {}

  get me() {
    if (this.currentUser && this.member) {
      return this.currentUser.businessId === this.member.businessId;
    }
  }

  onRemoveMember(member: IUser) {
    this.removeMember.emit(member);
  }
}
