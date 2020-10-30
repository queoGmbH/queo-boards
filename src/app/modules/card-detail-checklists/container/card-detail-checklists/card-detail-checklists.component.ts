import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { IBoardChecklist, ICardChecklist } from '@boards/core/interfaces';

import { CreateCardChecklist } from '@boards/store/card-checklist';

@Component({
  selector: 'boards-card-detail-checklists',
  templateUrl: './card-detail-checklists.component.html',
  styleUrls: ['./card-detail-checklists.component.scss']
})
export class CardDetailChecklistsComponent implements OnInit {
  createCardChecklistForm: FormGroup;
  tasksToCopyFrom: string;

  boardChecklists$: Observable<IBoardChecklist[]>;
  cardChecklists$: Observable<ICardChecklist[]>;

  @Input()
  boardId: string;
  @Input()
  cardId: string;

  @ViewChild('cardCopyChecklistTasks', {static: false})
  cardCopyChecklistTasks: ElementRef;

  constructor(private fb: FormBuilder, private store: Store<any>) {}

  ngOnInit() {
    this.cardChecklists$ = this.store.select('cardChecklists');
    this.boardChecklists$ = this.store.select('boardChecklists');

    this.createCardChecklistForm = this.fb.group({
      title: ['', Validators.required],
      checklistToCopyBusinessId: ''
    });
  }

  createCardChecklist() {
    this.store.dispatch(
      new CreateCardChecklist({
        cardChecklist: this.createCardChecklistForm.value,
        cardId: this.cardId
      })
    );
    this.createCardChecklistForm.reset();
    this.tasksToCopyFrom = '';
  }

  selectCardChecklist(cardChecklist: ICardChecklist) {
    this.tasksToCopyFrom = cardChecklist.title;
    this.createCardChecklistForm.patchValue({
      checklistToCopyBusinessId: cardChecklist.businessId
    });
  }

  trackByCardChecklist(index, item: ICardChecklist) {
    return item !== null ? item.businessId : null;
  }
}
