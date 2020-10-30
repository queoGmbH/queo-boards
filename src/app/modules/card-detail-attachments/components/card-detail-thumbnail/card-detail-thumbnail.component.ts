import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { Store } from '@ngrx/store';

import { take } from 'rxjs/operators';

import * as FileSaver from 'file-saver';

import { ICardAttachment, IConfirmDialogData } from '@boards/core/interfaces';

import { DialogService, DocumentService } from '@boards/core/services';

import { IState } from '@boards/store/state.interface';

import { RemoveCardAttachment } from '@boards/store/card-attachment';

@Component({
  selector: 'boards-card-detail-thumbnail',
  templateUrl: './card-detail-thumbnail.component.html',
  styleUrls: ['./card-detail-thumbnail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardDetailThumbnailComponent implements OnInit {
  @Input()
  thumbnail: ICardAttachment;

  constructor(
    private dialogService: DialogService,
    private domSanitizer: DomSanitizer,
    private documentService: DocumentService,
    private store: Store<IState>
  ) {}

  ngOnInit() {}

  download() {
    this.documentService
      .getDocumentDownload(this.thumbnail)
      .pipe(take(1))
      .subscribe((file: Blob) => {
        const blob = new Blob([file], { type: 'application/octet-stream' });
        FileSaver.saveAs(blob, this.thumbnail.originalFileName);
      });
  }

  get thumbnailStyle(): SafeStyle {
    return this.domSanitizer.bypassSecurityTrustStyle(
      `url(${this.thumbnail.url})`
    );
  }

  removeCardDetailAttachement() {
    const dialogData: IConfirmDialogData = {
      title: 'Anhänge',
      message: 'Anhang löschen?'
    };

    this.dialogService
      .confirm(dialogData)
      .pipe(take(1))
      .subscribe((confirm) => {
        if (confirm) {
          this.store.dispatch(
            new RemoveCardAttachment({
              attachmentId: this.thumbnail.businessId
            })
          );
        }
      });
  }
}
