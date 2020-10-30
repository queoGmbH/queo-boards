import { Pipe, PipeTransform } from '@angular/core';

import { Accessibility } from '@boards/core/enums';
import { IBoard } from '@boards/core/interfaces';

@Pipe({
  name: 'sortAccessibility'
})
export class SortAccessibilityPipe implements PipeTransform {
  constructor() {}

  transform(boards: IBoard[], accessibility: Accessibility): any {
    if (boards) {
      if (accessibility) {
        const restrictedBoards = boards.filter((board) => {
          return board.summary.accessibility === Accessibility.RESTRICTED;
        });

        const publicBoards = boards.filter((board) => {
          return board.summary.accessibility === Accessibility.PUBLIC;
        });

        return restrictedBoards.concat(publicBoards);
      }
    }

    return null;
  }
}
