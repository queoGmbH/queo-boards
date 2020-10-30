import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  forwardRef
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validator
} from '@angular/forms';

export const DATE_AS_TIME_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateAsTimeDirective),
  multi: true
};

export const DATE_AS_TIME_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => DateAsTimeDirective),
  multi: true
};

@Directive({
  selector: '[boardsDateAsTime]',
  providers: [
    DATE_AS_TIME_ACCESSOR
    // DATE_AS_TIME_VALIDATOR
  ]
})
export class DateAsTimeDirective implements ControlValueAccessor {
  dateValue: Date;

  @HostListener('input', ['$event.target.dateAsTime'])
  onChange = (_: any) => {};
  @HostListener('blur', [])
  onTouched = () => {};

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  writeValue(value: Date): void {
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'dateAsTime',
      value
    );
  }

  // get value(): any {
  //   return this.dateValue;
  // };
  //
  // set value(v: any) {
  //   if (v !== this.dateValue) {
  //     this.dateValue = v;
  //     this.propagateChange(v);
  //   }
  // }

  // registerOnChange(fn: any): void {
  //   /* console.log('registerOnChange', fn); */
  //   this.propagateChange = fn;
  // }
  //
  // registerOnTouched(fn: any): void {
  //   /* console.log('registerOnTouched', fn); */
  //   this.propagateTouched = fn;
  // }

  // writeValue(value: any) {
  //   if (value !== this.dateValue) {
  //     this.dateValue = value;
  //   }
  // }

  // validate(formControl: FormControl) {
  //   /* console.log('formControl', formControl.value); */
  //   return null;
  // }
}

//
