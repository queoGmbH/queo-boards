import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';

import { IUser } from '../../../../core/interfaces/user.interface';

@Component({
  selector: 'boards-card-user',
  templateUrl: './card-user.component.html',
  styleUrls: ['./card-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardUserComponent implements OnInit {
  @Input()
  user: IUser;

  constructor() {}

  ngOnInit() {}
}
