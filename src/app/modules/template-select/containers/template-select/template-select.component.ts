import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

import { IBoardSummary } from '@boards/core';

import { AppStoreService } from '@boards/store/app-store.service';

@Component({
  selector: 'boards-template-select',
  templateUrl: './template-select.component.html',
  styleUrls: ['./template-select.component.scss']
})
export class TemplateSelectComponent implements OnInit {
  selectedTemplate: IBoardSummary;

  boardTemplates$ = this.appStoreService.boardTemplates$;

  @Output()
  templateSelect = new EventEmitter<IBoardSummary>();

  constructor(private appStoreService: AppStoreService) {}

  ngOnInit() {}

  onTemplateSelect(template: MatSelectChange) {
    this.templateSelect.emit(template.value);
  }

  reset() {
    this.selectedTemplate = null;
    this.templateSelect.emit(null);
  }
}
