import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
  selector: 'boards-input-create',
  templateUrl: './input-create.component.html',
  styleUrls: ['./input-create.component.scss']
})
export class InputCreateComponent implements OnInit {
  inputFormGroup: FormGroup;

  @Input()
  inputFormControlName: string;
  @Input()
  maxLength;
  @Input()
  placeholder: string;
  @Output()
  create: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  createAndOpen = new EventEmitter();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
  }

  get empty() {
    return this.inputFormGroup.controls[this.inputFormControlName].value === '';
  }

  buildForm() {
    this.inputFormGroup = this.fb.group({
      [this.inputFormControlName]: ['', [Validators.maxLength(this.maxLength)]]
    });
  }

  onCreate(event: any) {
    event.preventDefault();
    if (!this.empty && this.inputFormGroup.valid) {
      this.create.emit(
        this.inputFormGroup.controls[this.inputFormControlName].value
      );
      this.inputFormGroup.reset();
      this.inputFormGroup.setValue({
        [this.inputFormControlName]: ''
      });
    }
  }

  onCreateAndOpenCard(event: any) {
    event.preventDefault();
    if (!this.empty && this.inputFormGroup.valid) {
      this.createAndOpen.emit(
        this.inputFormGroup.controls[this.inputFormControlName].value
      );
      this.inputFormGroup.reset();
      this.inputFormGroup.setValue({
        [this.inputFormControlName]: ''
      });
    }
  }
}
