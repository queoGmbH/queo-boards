import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ICardComment } from '@boards/core/interfaces';

@Component({
  selector: 'boards-card-detail-comment',
  templateUrl: './card-detail-comment.component.html',
  styleUrls: ['./card-detail-comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardDetailCommentComponent implements OnInit {
  bearbeitenButtonDown = false;
  cardDetailCommentForm: FormGroup;

  editCardDetailComment: boolean;

  @Input()
  cardDetailComment: ICardComment;
  @Input()
  canChange = false;

  @Output()
  updateCardDetailComment = new EventEmitter<ICardComment>();
  @Output()
  removeCardDetailComment = new EventEmitter<ICardComment>();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.cardDetailCommentForm = this.fb.group({
      text: ['', Validators.required]
    });

    this.editCardDetailComment = false;
  }

  get formChanged(): boolean {
    if (this.cardDetailComment) {
      const { text } = this.cardDetailCommentForm.value;
      return text !== this.cardDetailComment.text;
    }
  }

  get formValid(): boolean {
    if (this.cardDetailComment) {
      return this.cardDetailCommentForm.valid;
    }
  }

  get comment() {
    if (this.cardDetailComment) {
      if (this.cardDetailComment.isDeleted) {
        return 'Kommentar gelöscht.';
      }
      return this.cardDetailComment.text.replace(/\r?\n/g, '<br />');
    }
  }

  toggleEditComment() {
    this.editCardDetailComment = !this.editCardDetailComment;
    if (this.editCardDetailComment) {
      const { text } = this.cardDetailComment;
      this.cardDetailCommentForm.patchValue({ text });
    }
  }

  onUpdateCardDetailComment() {
    if (this.formValid) {
      const { text } = this.cardDetailCommentForm.value;
      this.updateCardDetailComment.emit({
        ...this.cardDetailComment,
        text
      });
      this.toggleEditComment();
    }
  }

  onRemoveCardDetailComment() {
    this.removeCardDetailComment.emit(this.cardDetailComment);
  }

  cancelUpdateCardDetailComment() {
    this.toggleEditComment();
  }

  handleMouseUp() {
    this.bearbeitenButtonDown = false;
  }

  clickedOutside() {
    if (
      !this.formChanged &&
      this.editCardDetailComment &&
      this.bearbeitenButtonDown
    ) {
      this.cancelUpdateCardDetailComment();
    }
    if (
      this.formChanged &&
      this.editCardDetailComment &&
      this.bearbeitenButtonDown
    ) {
      this.onUpdateCardDetailComment();
    }
    this.bearbeitenButtonDown = true;
  }
}
