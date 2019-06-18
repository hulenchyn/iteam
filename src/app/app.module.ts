import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StopwatchComponent } from "./stopwatch/stopwatch.component"
import { DebounceClickDirective } from './debounce-click.directive';

@NgModule({
  declarations: [
    AppComponent, StopwatchComponent, DebounceClickDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
