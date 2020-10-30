import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatButtonToggleChange } from '@angular/material/button-toggle';

import { ILabel } from '@boards/core/interfaces';

@Component({
  selector: 'boards-board-label-form',
  templateUrl: './board-label-form.component.html',
  styleUrls: ['./board-label-form.component.scss']
})
export class BoardLabelFormComponent implements OnChanges, OnInit {
  boardLabelForm: FormGroup;

  selectedColor: string;

  @Input()
  labelColors;
  @Input()
  selectedBoardLabel: ILabel;
  @Input()
  editBoardLabel: boolean;

  @Input()
  setFocus: boolean;

  @Output()
  createBoardLabel = new EventEmitter();
  @Output()
  updateBoardLabel = new EventEmitter();
  @Output()
  removeBoardLabel = new EventEmitter();

  @Output()
  resetEdit = new EventEmitter();

  @ViewChild('labelName', {static: true})
  labelName: ElementRef;

  constructor(private fb: FormBuilder) {}

  ngOnChanges() {
    if (this.editBoardLabel) {
      const { name, color } = this.selectedBoardLabel;
      this.selectedColor = color;
      this.boardLabelForm.patchValue({
        name,
        color
      });
    } else {
      this.selectedColor = this.labelColors[0].color;
      if (this.boardLabelForm) {
        this.resetForm();
      }
    }
  }

  ngOnInit() {
    this.selectedColor = this.labelColors[0].color;
    this.boardLabelForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(25)]],
      color: [this.selectedColor, Validators.required]
    });

    if (this.setFocus) {
      this.labelName.nativeElement.focus();
    }
  }

  onLabelColorSelect(event: MatButtonToggleChange) {
    const { value: color } = event;
    this.selectedColor = color;
    this.boardLabelForm.patchValue({ color });
  }

  onCreateBoardLabel(event) {
    if (this.boardLabelForm.valid) {
      const label: ILabel = this.boardLabelForm.value;
      this.createBoardLabel.emit({ label, event });
      this.resetForm();
    }
  }

  onUpdateBoardLabel() {
    if (this.boardLabelForm.valid) {
      const { name, color } = this.boardLabelForm.value;
      this.updateBoardLabel.emit({
        ...this.selectedBoardLabel,
        name,
        color
      });
      this.resetForm();
    }
  }

  onRemoveBoardLabel() {
    this.removeBoardLabel.emit(this.selectedBoardLabel);
  }

  cancel(event: MouseEvent) {
    this.resetEdit.emit(event);
    this.resetForm();
  }

  resetForm() {
    this.selectedColor = this.labelColors[0].color;
    this.boardLabelForm.setValue({
      name: '',
      color: this.selectedColor
    });
    this.boardLabelForm.markAsPristine();
  }
}
