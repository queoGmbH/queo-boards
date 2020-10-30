import { Pipe, PipeTransform } from '@angular/core';

import {
  DomSanitizer,
  SafeHtml,
  SafeStyle,
  SafeScript,
  SafeUrl,
  SafeResourceUrl
} from '@angular/platform-browser';

import { SafeType } from '@boards/core/enums';

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {}

  public transform(
    value: string,
    type: SafeType = SafeType.HTML
  ): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    switch (type) {
      case SafeType.HTML: {
        return this.domSanitizer.bypassSecurityTrustHtml(value);
      }
      case SafeType.STYLE: {
        return this.domSanitizer.bypassSecurityTrustStyle(value);
      }
      case SafeType.SCRIPT: {
        return this.domSanitizer.bypassSecurityTrustScript(value);
      }
      case SafeType.URL: {
        return this.domSanitizer.bypassSecurityTrustUrl(value);
      }
      case SafeType.RESOURCE_URL: {
        return this.domSanitizer.bypassSecurityTrustResourceUrl(value);
      }
      default:
        throw new Error(`Invalid safe type specified: ${type}`);
    }
  }
}
