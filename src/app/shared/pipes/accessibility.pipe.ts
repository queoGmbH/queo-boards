import { Pipe, PipeTransform } from '@angular/core';

import { Accessibility } from '@boards/core/enums';
import { IBoardSummary } from '@boards/core/interfaces';

@Pipe({
  name: 'accessibility'
})
export class AccessibilityPipe implements PipeTransform {
  constructor() {}

  transform(summaries: IBoardSummary[], accessibility: Accessibility): any {
    if (summaries) {
      switch (accessibility) {
        case Accessibility.PUBLIC:
          return summaries.filter((summary) => {
            return summary.accessibility === Accessibility.PUBLIC;
          });
        case Accessibility.RESTRICTED:
          return summaries.filter((summary) => {
            return summary.accessibility === Accessibility.RESTRICTED;
          });
      }
    }
  }
}
