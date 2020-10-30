import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

import { Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';

import { IUser } from '@boards/core/interfaces';

import { UserNamePipe } from '@boards/shared/pipes/user-name.pipe';

@Component({
  selector: 'boards-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserSearchComponent implements OnInit {
  userSearch: FormGroup;

  filteredUsers: Observable<IUser[]>;

  @Input()
  users: IUser[];

  @Output()
  addMember = new EventEmitter<IUser>();

  @ViewChild('searchInput', {static: false})
  searchInput: ElementRef;
  @ViewChild('searchInput', {static: false, read: MatAutocompleteTrigger })
  memberSearch: MatAutocompleteTrigger;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.userSearch = this.fb.group({
      user: ['', []]
    });

    this.filteredUsers = this.userSearch.valueChanges.pipe(
      startWith(null),
      // filter actions only if search term is present
      filter((search: any) => !!search),
      // enforce search string or user result
      map(
        (search: any): string | IUser =>
          typeof search === 'object' ? search.user : search
      ),
      map(
        (user: string | IUser): IUser[] => {
          // tslint:disable one-line
          // if a search string is given filter the users
          if (typeof user === 'string') {
            // close autocomplete list on empty search
            if (user.length < 1) {
              this.memberSearch.closePanel();
              return null;
            }
            // filter users collection by search term
            return this.filterUsers(user);
          } else if (user) {
            // if only a single user is given handle as result
            this.onAddMember(user);
            return [user];
          }
          // tslint:enable one-line
        }
      )
    );
  }

  filterUsers(search: string): IUser[] {
    if (search && this.users) {
      return this.users.filter((user) => {
        const pattern = new RegExp('^' + search, 'i');
        const fn = user.firstname;
        const ln = user.lastname;
        if (fn && ln) {
          return fn.match(pattern) || ln.match(pattern);
        }
        return false;
      });
    }
    return this.users;
  }

  displayUser(user: IUser): string {
    const userNamePipe = new UserNamePipe();
    return user ? userNamePipe.transform(user) : '';
  }

  onAddMember(user: IUser) {
    this.userSearch.reset();
    this.addMember.emit(user);
  }

  focusSearchInput() {
    this.searchInput.nativeElement.focus();
  }
}
