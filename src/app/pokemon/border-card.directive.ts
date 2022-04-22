import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appBorderCard]'
})
export class BorderCardDirective {

  private initialColor: string = '#f5f5f5';
  private defaultlColor: string = '#009688';
  private defaultHeight: number = 180;

  constructor(private el: ElementRef) {
    this.setHeight(this.defaultHeight);
    this.setBorder(this.initialColor);
  }

  @Input('appBorderCard') borderColor: string;

  @HostListener('mouseenter') onMouseEnter() {
    console.log('enter');
    this.setBorder(this.borderColor || this.defaultlColor);
  }

  @HostListener('mouseleave') onMouseLeave() {
    console.log('leave');
    this.setBorder(this.initialColor);
  }

  setHeight(height: number) {
    this.el.nativeElement.style.height = `${height}px`;
  }

  setBorder(color: string) {
    console.log(color);
    this.el.nativeElement.style.border = `solid 4x ${color}`;
  }

}
