import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'boards-input-update',
  templateUrl: './input-update.component.html',
  styleUrls: ['./input-update.component.scss']
})
export class InputUpdateComponent implements OnChanges, OnInit {
  inputFormGroup: FormGroup;

  @Input()
  inputFormControlName: string;
  @Input()
  maxLength;
  @Input()
  placeholder: string;
  @Input()
  value: string;
  @Output()
  update: EventEmitter<string> = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {}

  ngOnChanges() {
    if (this.inputFormGroup) {
      this.inputFormGroup.setValue({
        [this.inputFormControlName]: this.value
      });
    }
  }

  ngOnInit() {
    this.buildForm();
  }

  get changed() {
    return (
      this.value !==
      this.inputFormGroup.controls[this.inputFormControlName].value
    );
  }

  buildForm() {
    this.inputFormGroup = this.fb.group({
      [this.inputFormControlName]: [
        this.value,
        [Validators.required, Validators.maxLength(this.maxLength)]
      ]
    });
  }

  onUpdate(event: any) {
    event.preventDefault();
    const value = this.inputFormGroup.controls[this.inputFormControlName].value;
    if (this.inputFormGroup.valid && this.changed) {
      this.update.emit(value);
    }
  }
}
