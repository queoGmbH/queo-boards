import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { select, Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import {
  IBoard,
  IBoardSummary,
  IUser,
  IUserState
} from '@boards/core/interfaces';
import { BoardRole, UserRole } from '@boards/core/enums';

import { DialogService } from '@boards/core/services';

import { IState } from '@boards/store/state.interface';

import { CreateArchivedBoard } from '@boards/store/board-archive';

@Component({
  selector: 'boards-update-board',
  templateUrl: './update-board.component.html',
  styleUrls: ['./update-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateBoardComponent implements OnDestroy, OnInit {
  BOARD_OWNER = BoardRole.OWNER;
  BOARD_MEMBER = BoardRole.MEMBER;
  ROLE_ADMIN = UserRole.ADMIN;

  board$: Observable<IBoard>;
  users$: Observable<IUserState>;
  currentUser$: Observable<IUser>;

  boardSummary: IBoardSummary;
  boardSummary$: Observable<IBoardSummary>;

  updateBoardSummaryForm: FormGroup;

  subscription: Subscription;

  accessibilityOptions: string[] = ['Public', 'Restricted'];

  @Output()
  updateBoardSummary = new EventEmitter();

  constructor(
    private dialogService: DialogService,
    private fb: FormBuilder,
    private store: Store<any>
  ) {}

  ngOnInit() {
    this.initForm();

    this.board$ = this.store.pipe(select((state: IState) => state.board));
    this.users$ = this.store.pipe(select((state: IState) => state.users));
    this.boardSummary$ = this.store.pipe(
      select((state: IState) => state.board.summary)
    );
    this.currentUser$ = this.store.pipe(
      select((state: IState) => state.users.currentUser)
    );

    this.subscription = this.boardSummary$.subscribe(
      (boardSummary: IBoardSummary) => {
        this.boardSummary = boardSummary;

        this.updateBoardSummaryForm.setValue({
          title: boardSummary.title,
          colorScheme: boardSummary.colorScheme,
          accessibility: boardSummary.accessibility
        });
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  initForm() {
    this.updateBoardSummaryForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(60)]],
      colorScheme: ['', Validators.required],
      accessibility: ['', Validators.required]
    });
  }

  handleThemeSelect(themeName: string) {
    this.updateBoardSummaryForm.patchValue({
      colorScheme: themeName
    });
  }

  onUpdateBoardSummary() {
    if (this.updateBoardSummaryForm.valid) {
      this.updateBoardSummary.emit(this.updateBoardSummaryForm.value);
    }
  }

  get changed() {
    const { title, colorScheme, accessibility, isTemplate } = this.boardSummary;
    return (
      JSON.stringify({
        title,
        colorScheme,
        accessibility
      }) !== JSON.stringify(this.updateBoardSummaryForm.value)
    );
  }

  archiveBoard() {
    const dialogData = {
      title: 'Archiv',
      message: `Board "${this.boardSummary.title}" in das Archiv verschieben?`
    };

    this.dialogService
      .confirm(dialogData)
      .pipe(take(1))
      .subscribe((confirm) => {
        if (confirm) {
          this.store.dispatch(
            new CreateArchivedBoard({ boardSummary: this.boardSummary })
          );
        }
      });
  }
}
