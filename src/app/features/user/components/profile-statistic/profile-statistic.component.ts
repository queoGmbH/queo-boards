import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'boards-profile-statistic',
  templateUrl: './profile-statistic.component.html',
  styleUrls: ['./profile-statistic.component.scss']
})
export class ProfileStatisticComponent implements OnInit {
  @Input()
  statistics;

  constructor() {}

  ngOnInit() {}
}
