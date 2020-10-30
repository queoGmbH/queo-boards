import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { Observable } from 'rxjs';

import { HelpService } from '../../services/help.service';

@Component({
  selector: 'queo-help-dialog',
  templateUrl: './help-dialog.component.html',
  styleUrls: ['./help-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelpDialogComponent implements OnInit {
  version$: Observable<any>;

  constructor(
    private dialogRef: MatDialogRef<HelpDialogComponent>,
    private helpService: HelpService
  ) {}

  ngOnInit() {
    this.version$ = this.helpService.getVersion();
  }

  ok() {
    this.dialogRef.close();
  }
}
