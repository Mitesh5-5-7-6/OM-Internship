import { AfterViewInit, Component, DestroyRef, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-server-status',
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css'
})
export class ServerStatusComponent implements OnInit, AfterViewInit {
  currentStatus = signal<'online' | 'offline' | 'unknown'>('offline');

  // This are good but use DestroyRef
  // This is a good practice to use DestroyRef

  // private statusInterval: NodeJS.Timeout | undefined;
  // statusInterval: ReturnType<typeof setInterval> | undefined;

  private destroyRef = inject(DestroyRef);
  // Use DestroyRef for modern Angular patterns, composables, or signal-based logic.
  // Use ngOnDestroy() for traditional class-based component logic.
  // Both do the same job: cleanup logic on destroy, but DestroyRef is more composable and cleaner in newer Angular patterns.

  // The constructor is a special method for creating and initializing an object created with a class.
  // It is called when an instance of the class is created.
  // The constructor is a good place to initialize class members and inject dependencies.
  // It is not a good place to perform side effects, such as making HTTP requests or subscribing to observables.
  // The constructor should be used for initializing the class and injecting dependencies.

  // constructor() should only be used for initializing the class and injecting dependencies.
  // setInterval() or other side-effect logic (like timers, API calls, subscriptions) in the constructor
  // Breaks Angular's lifecycle structure.
  // constructor() {
  //   this.statusInterval = setInterval(() => {
  //     const rnd = Math.random();
  //     if (rnd < 0.5) {
  //       this.currentStatus = 'online'
  //       console.log('online in constructor')
  //     } else if (rnd < 0.8) {
  //       this.currentStatus = 'offline'
  //       console.log('offline in constructor')
  //     } else {
  //       this.currentStatus = 'unknown'
  //       console.log('unknown in constructor')
  //     }
  //   }, 2000);
  // }

  constructor() {
    effect(() => {
      console.log(this.currentStatus());
    })
  }

  // best practice for Data fetching or polling (setInterval, setTimeout, HTTP calls, APIs).
  ngOnInit() {
    const interval = setInterval(() => {
      const rnd = Math.random();
      if (rnd < 0.5) {
        this.currentStatus.set('online')
        // console.log('online in ngOnInit')

      } else if (rnd < 0.8) {
        this.currentStatus.set('offline')
        // console.log('offline in ngOnInit')

      } else {
        this.currentStatus.set('unknown')
        // console.log('unknown in ngOnInit')
      }
    }, 2000);

    this.destroyRef.onDestroy(() => {
      clearInterval(interval);
      console.log('Interval cleared in ngOnDestroy');
    })
  }

  ngAfterViewInit() {
    // This lifecycle hook is called after the view has been fully initialized.
    // It's a good place to perform any additional initialization that requires the view to be fully rendered.
    console.log('ngAfterViewInit: View has been initialized');
  }

  // ngOnDestroy() {
  //   clearInterval(this.statusInterval);
  // }

}
