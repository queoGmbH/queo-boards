import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';

import { Subscription } from 'rxjs';

import { ICard } from '../../../../core/interfaces/card.interface';
import { ShowSnackBarError } from '@boards/store/ui';
import { Store } from '@ngrx/store';
import { IState } from '@boards/store/state.interface';
import {ConfigurationService} from "@boards/configuration";
import {FileService} from "@boards/shared/services/file.service";

@Component({
  selector: 'boards-card-detail-upload',
  templateUrl: './card-detail-upload.component.html',
  styleUrls: ['./card-detail-upload.component.scss']
})
export class CardDetailUploadComponent implements OnInit {
  extensions: string[];
  loading: boolean;
  formError: boolean;
  subscription: Subscription;

  maxFileSize = this.configService.fileUploadMaxSize;
  maxFileSizeFormatted = this.fileService.formatBytes(<number>this.maxFileSize);

  @Input()
  card: ICard;

  @Output()
  fileSelect: EventEmitter<File> = new EventEmitter();

  @ViewChild('inputFile', {static: false})
  nativeInputFile: ElementRef;

  constructor(private store: Store<IState>,
              private configService: ConfigurationService,
              private fileService: FileService) {}

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
    this.formError = false;
  }

  get fileExtensions() {
    return this.extensions.map((ext) => `.${ext}`).join();
  }

  onNativeInputFileSelect(event) {
    const file: File = (event.srcElement || event.target).files[0];

    if (this.fileAllowed(file) && file.size <= this.maxFileSize) {
      this.formError = false;
      this.fileSelect.emit(file);
    } else {
      // this.formError = true;

      this.store.dispatch(
        new ShowSnackBarError({
          message:
            `Error: max. ${this.maxFileSizeFormatted}, Dateien: gif, jpg, jpeg, png, pdf, doc, docx, xls, xlsx, ppt, pptx`
        })
      );
    }
  }

  hideFormError() {
    this.formError = false;
    this.nativeInputFile.nativeElement.value = '';
  }

  selectFile() {
    this.nativeInputFile.nativeElement.click();
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
}
