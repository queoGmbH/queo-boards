import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'boards-card-tasks',
  templateUrl: './card-tasks.component.html',
  styleUrls: ['./card-tasks.component.scss']
})
export class CardTasksComponent implements OnInit {
  @Input()
  tasksDoneCount: number;
  @Input()
  tasksOverallCount: number;

  constructor() {}

  ngOnInit() {}

  get showCounter(): boolean {
    return this.tasksOverallCount > 0;
  }

  get tasksCounter(): string {
    return `${this.tasksDoneCount}/${this.tasksOverallCount}`;
  }
}
