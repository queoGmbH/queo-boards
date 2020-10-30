import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output
} from '@angular/core';

@Directive({
  selector: '[boardsClickOutside]',
  exportAs: 'boardsClickOutside'
})
export class ClickOutsideDirective {
  @Output()
  boardsClickOutside = new EventEmitter<MouseEvent>();

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement) {
      return;
    }

    const clickedInside = this._elementRef.nativeElement.contains(
      targetElement
    );
    if (!clickedInside) {
      this.boardsClickOutside.emit(event);
    }
  }

  constructor(private _elementRef: ElementRef) {}
}
