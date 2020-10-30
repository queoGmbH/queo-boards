import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { Accessibility } from '../../../../core/enums/accessibility.enum';
import { IBoardSummary } from '../../../../core/interfaces/board-summary.interface';

@Component({
  selector: 'boards-board-form',
  templateUrl: './board-form.component.html',
  styleUrls: ['./board-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardFormComponent implements OnDestroy, OnInit {
  createBoardForm: FormGroup;
  createBoardFormSubscription: Subscription;

  accessibilityOptions: Accessibility[] = [
    Accessibility.PUBLIC,
    Accessibility.RESTRICTED
  ];

  @Input()
  data: any;
  @Input()
  maxLength;

  @Output()
  formChange = new EventEmitter();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.createBoardForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(60)]],
      colorScheme: ['', Validators.required],
      accessibility: [this.data.accessibility, Validators.required]
    });

    this.createBoardFormSubscription = this.createBoardForm.valueChanges.subscribe(
      (formData) => {
        this.formChange.emit({
          formData,
          valid: this.createBoardForm.valid
        });
      }
    );
  }

  ngOnDestroy() {
    this.createBoardFormSubscription.unsubscribe();
  }

  handleThemeSelect(themeName: string) {
    this.createBoardForm.patchValue({
      colorScheme: themeName
    });
  }

  handleTemplateSelect(boardSummary: IBoardSummary) {
    if (boardSummary) {
      if (this.createBoardForm.contains('template')) {
        this.createBoardForm.patchValue({
          template: boardSummary.businessId
        });
      } else {
        this.createBoardForm.addControl(
          'template',
          this.fb.control(boardSummary.businessId)
        );
      }
    } else {
      if (this.createBoardForm.contains('template')) {
        this.createBoardForm.removeControl('template');
      }
    }
  }
}
