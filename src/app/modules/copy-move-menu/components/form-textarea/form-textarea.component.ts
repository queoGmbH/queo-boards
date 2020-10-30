import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'boards-form-textarea',
  templateUrl: './form-textarea.component.html',
  styleUrls: ['./form-textarea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormTextareaComponent implements OnInit {
  @Input()
  controlName: string;
  @Input()
  group: FormGroup;

  constructor() {}

  ngOnInit() {}
}
