import { AfterContentInit, afterNextRender, afterRender, Component, contentChild, ContentChild, ElementRef, HostBinding, HostListener, inject, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-control',
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'control',
    '(click)': 'onClick()'
  }
})
export class ControlComponent implements AfterContentInit {
  // @HostBinding('class') clasName = 'control';
  // @HostListener('click') onClick() {
  //   console.log('Clicked')
  // }
  label = input.required<string>();
  private el = inject(ElementRef);

  // @ContentChild('input') private content?: ElementRef<HTMLInputElement | HTMLTextAreaElement>;
  private content = contentChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('input')

  constructor() {
    afterRender(() => {
      console.log("After Render");
    })

    afterNextRender(() => {
      console.log("After Next Render");
    });
  }

  ngAfterContentInit(): void {

  }

  onClick() {
    console.log('Clicked')
    console.log(this.el)
    console.log(this.content());
  }
}