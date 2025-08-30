import { Component } from '@angular/core';
import { GetSetComponent } from "./component/get-set/get-set.component";
import { ProfileComponent } from "./component/profile/profile.component";
import { SwitchComponent } from "./component/switch/switch.component";
import { LoopComponent } from "./component/loop/loop.component";
import { EventsComponent } from "./component/events/events.component";
import { SignalsComponent } from "./component/signals/signals.component";
import { ComputedSignalComponent } from "./component/computed-signal/computed-signal.component";
import { ForLoopContextualVariablesComponent } from "./component/for-loop-contextual-variables/for-loop-contextual-variables.component";
import { LifecycleComponent } from './lifecycle/lifecycle/lifecycle.component';
import { CustomTwoWayBindingComponent } from "./two-way-binding/custom-two-way-binding/custom-two-way-binding.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [GetSetComponent, ProfileComponent, SwitchComponent, LoopComponent, EventsComponent, SignalsComponent, ComputedSignalComponent, ForLoopContextualVariablesComponent, LifecycleComponent, CustomTwoWayBindingComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  count: number = 0;

  handleCounter(val: string) {
    if (val === 'add') {
      this.count = this.count + 1
    } else if (val === 'remove') {
      if (this.count > 0) {
        this.count = this.count - 1
      }
    } else {
      this.count = 0
    }
  }

  // Lifecycle component
  // This component is used to demonstrate the lifecycle hooks in Angular
  lifecycleComponentIsVisible = false;
  lifecycleInputText = 'Some Random Number: ' + Math.random() * 100;

  onToggleLifecycleComponentVisibility() {
    this.lifecycleComponentIsVisible = !this.lifecycleComponentIsVisible;
  }

  onChangeLifecycleInputText() {
    this.lifecycleInputText = 'Some Random Number: ' + Math.random() * 100;
  }

  rectSize = {
    width: '100',
    height: '100'
  }
}
