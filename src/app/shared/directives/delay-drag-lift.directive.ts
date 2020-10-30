import { Directive, ElementRef, HostListener } from '@angular/core';

/**
 * Took from here https://github.com/bevacqua/dragula/issues/289
 */

@Directive({
  selector: '[boardsDelayDragLift]'
})
export class DelayDragLiftDirective {
  dragDelay = 200;
  draggable = false;
  touchTimeout;

  @HostListener('touchmove', ['$event'])
  onMove(e: Event) {
    if (!this.draggable) {
      e.stopPropagation();
      clearTimeout(this.touchTimeout);
    }
  }

  @HostListener('touchstart', ['$event'])
  onDown(e: Event) {
    this.touchTimeout = setTimeout(() => {
      this.draggable = true;
    }, this.dragDelay);
  }

  @HostListener('touchend', ['$event'])
  onUp(e: Event) {
    clearTimeout(this.touchTimeout);
    this.draggable = false;
  }

  constructor(private el: ElementRef) {}
}
