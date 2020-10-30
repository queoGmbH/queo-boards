import {
  AfterViewChecked,
  Directive,
  ElementRef,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[boardsAutoResizeTextarea]'
})
export class AutoResizeTextareaDirective implements AfterViewChecked {
  @HostListener('input')
  onInput() {
    this.updateHeight();
  }

  constructor(private element: ElementRef) {}

  ngAfterViewChecked() {
    this.updateHeight();
  }

  updateHeight() {
    this.element.nativeElement.style.height = 'auto';
    this.element.nativeElement.style.height =
      this.element.nativeElement.scrollHeight + 2 + 'px';
    this.element.nativeElement.style.overflow = 'hidden';
  }
}
