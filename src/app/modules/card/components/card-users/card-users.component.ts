import { Component, Input, OnInit } from '@angular/core';

import { IUser } from '../../../../core/interfaces/user.interface';

@Component({
  selector: 'boards-card-users',
  templateUrl: './card-users.component.html',
  styleUrls: ['./card-users.component.scss']
})
export class CardUsersComponent implements OnInit {
  @Input()
  users: IUser[];

  constructor() {}

  ngOnInit() {}
}
