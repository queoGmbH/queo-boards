import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';

import { ActionsSubject, Store } from '@ngrx/store';

import {
  FileSystemDirectoryEntry,
  FileSystemFileEntry,
  NgxFileDropEntry
} from 'ngx-file-drop';

import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { IState } from '@boards/store/state.interface';
import { ShowSnackBarError } from '@boards/store/ui';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'boards-file-drag-and-drop',
  templateUrl: './file-drag-and-drop.component.html',
  styleUrls: ['./file-drag-and-drop.component.scss']
})
export class FileDragAndDropComponent implements OnInit, OnDestroy {
  progressSpinner$ = new BehaviorSubject<boolean>(false);
  extensions: string[];
  files: NgxFileDropEntry[] = [];

  @Output()
  fileSelect: EventEmitter<File> = new EventEmitter();

  @ViewChild('filedrop', {static: true})
  filedrop;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private store: Store<IState>,
    private dispatcher: ActionsSubject
  ) {}

  ngOnInit() {
    this.extensions = [
      'gif',
      'jpg',
      'jpeg',
      'png',
      'pdf',
      'doc',
      'docx',
      'xls',
      'xlsx',
      'ppt',
      'pptx'
    ];
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  fileAllowed(file: File): boolean {
    const fileExtension = /[.]/.exec(file.name)
      ? /[^.]+$/.exec(file.name)
      : undefined;
    const found = this.extensions.find((ext) => {
      return ext === fileExtension[0].toLowerCase();
    });
    return !!found;
  }

  dropped(files: NgxFileDropEntry[]) {
    this.files = files;

    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.filedrop.dropZoneLabel = ' ';
          this.progressSpinner$.next(true);
          if (this.fileAllowed(file) && file.size < 5242880) {
            this.fileSelect.emit(file);
          } else {
            this.store.dispatch(
              new ShowSnackBarError({
                message:
                  'Error: max. 5MB, Dateien: gif, jpg, jpeg, png, pdf, doc, docx, xls, xlsx, ppt, pptx'
              })
            );
          }

          this.dispatcher
            .pipe(
              takeUntil(this.unsubscribe$),
              tap((action) => {
                if (
                  action.type === '[UI] Show Snack bar Error' ||
                  action.type ===
                    '[CARD_ATTACHMENT] Create Card Attachment Success' ||
                  action.type ===
                    '[CARD_ATTACHMENT] Create Card Attachment Fail'
                ) {
                  this.filedrop.dropZoneLabel = 'Drop files here';
                  this.progressSpinner$.next(false);
                }
              })
            )
            .subscribe();
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        this.filedrop.dropZoneLabel = 'Drop files here';
        this.progressSpinner$.next(false);
      }
    }
  }

  fileOver(event) {
    // console.log(event);
  }

  fileLeave(event) {
    // console.log(event);
  }
}
