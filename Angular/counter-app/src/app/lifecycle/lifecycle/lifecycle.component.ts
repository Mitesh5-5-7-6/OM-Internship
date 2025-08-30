import {
  Component, Input,
  OnInit,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-lifecycle',
  imports: [],
  templateUrl: './lifecycle.component.html',
  styleUrl: './lifecycle.component.css'
})
export class LifecycleComponent implements
  OnInit,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy {

  @Input() text?: string;

  constructor() {
    console.log('CONSTRUCTOR');
    console.log(this.text); // undefined
  }

  ngOnInit() {
    console.log('ngOnInit');
    console.log(this.text); // text value shows up here
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges');
    console.log(changes); // show previous and current value
    // console.log(changes.text.previousValue);
    console.log(this.text);
  }

  ngDoCheck() {
    console.log('ngDoCheck');
    console.log(this.text);
  }

  ngAfterContentInit() {
    console.log('ngAfterContentInit');
    console.log(this.text);
  }

  ngAfterContentChecked() {
    console.log('ngAfterContentChecked');
    console.log(this.text);
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit');
    console.log(this.text);
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked');
    console.log(this.text);
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
    console.log(this.text);
  }
}
