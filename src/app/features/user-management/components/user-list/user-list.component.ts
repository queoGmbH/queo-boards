import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { IUser } from '@boards/core/interfaces';
import { Observable } from 'rxjs/index';

@Component({
  selector: 'boards-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnChanges {
  displayedColumns: string[] = [
    'lastname',
    'firstname',
    'login',
    'roles',
    'edit'
  ];
  dataSource = new MatTableDataSource<IUser>();

  @ViewChild(MatPaginator, {static: false})
  paginator: MatPaginator;
  @ViewChild(MatSort, {static: false})
  sort: MatSort;

  @Input()
  users: IUser[];
  @Output()
  userSelect = new EventEmitter<IUser>();

  constructor() {}

  ngOnInit() {
    if (this.users) {
      this.dataSource.data = this.users;
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges() {
    if (this.users) {
      this.dataSource.data = this.users;
    }
  }

  onUserSelect(user: IUser) {
    this.userSelect.emit(user);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
