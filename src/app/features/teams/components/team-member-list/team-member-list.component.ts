import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { IUser } from '../../../../core/interfaces/user.interface';

@Component({
  selector: 'boards-team-member-list',
  templateUrl: './team-member-list.component.html',
  styleUrls: ['./team-member-list.component.scss']
})
export class TeamMemberListComponent implements OnInit {
  @Input()
  members: IUser[];

  @Output()
  removeMember = new EventEmitter<IUser>();

  constructor() {}

  ngOnInit() {}

  onRemoveMember(member: IUser) {
    this.removeMember.emit(member);
  }
}
