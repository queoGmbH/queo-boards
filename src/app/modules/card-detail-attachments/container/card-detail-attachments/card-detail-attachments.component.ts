import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Observable, forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { ICard, ICardAttachment } from '@boards/core/interfaces';

import { DocumentService } from '@boards/core/services';

import { IState } from '@boards/store/state.interface';

import { CreateCardAttachment } from '@boards/store/card-attachment';

@Component({
  selector: 'boards-card-detail-attachments',
  templateUrl: './card-detail-attachments.component.html',
  styleUrls: ['./card-detail-attachments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardDetailAttachmentsComponent implements OnInit {
  thumbnails$: Observable<any>;

  height: number;
  width: number;

  @Input()
  card: ICard;

  constructor(
    private store: Store<IState>,
    private documentService: DocumentService
  ) {}

  ngOnInit() {
    this.height = 150;
    this.width = 150;

    this.thumbnails$ = this.store.pipe(
      select((state: IState) => state.cardAttachments),
      map((cardAttachments: ICardAttachment[]) => {
        return cardAttachments.map((cardAttachment) => {
          return {
            ...cardAttachment,
            height: this.height,
            width: this.width
          };
        });
      }),
      switchMap((cardAttachments: ICardAttachment[]) => {
        if (cardAttachments.length) {
          return forkJoin(
            cardAttachments.map((cardAttachment) => {
              return this.documentService
                .getDocumentThumbnail(cardAttachment)
                .pipe(
                  map((res: Blob) => {
                    // console.log(res);
                    return {
                      ...cardAttachment,
                      url: window.URL.createObjectURL(res)
                    };
                  })
                );
            })
          );
        } else {
          return of([]);
        }
      })
    );
  }

  onFileSelect(event: File) {
    const formData: FormData = new FormData();
    formData.append('upload', event, event.name);
    this.store.dispatch(
      new CreateCardAttachment({ card: this.card, formData })
    );
  }
}
