import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map,  filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css']
})
export class StopwatchComponent implements OnDestroy, OnInit {
    
    start: number = 0;
    counter: number = 0;
    stopwatchSubscription: Subscription;
    startText = 'Start';
    waitText = 'Wait';
    paused: boolean = false;
    stopped: boolean = false;

    minutesDisplay: number = 0;
    hoursDisplay: number = 0;
    secondsDisplay: number = 0;
    
    stopwatch = new Observable<number>(observer => {
        let secondsPassed = 0;
        observer.next(secondsPassed);
        const stopwatchInterval = setInterval(() => {
          secondsPassed += 1;
          observer.next(secondsPassed);
        }, 1000);
        return () => clearInterval(stopwatchInterval);
      });

    startStopTimer() {
      if ( this.paused && this.startText != 'Stop' || this.startText == 'Start') {
        this.startText = 'Stop';
        this.paused = false;
        this.stopwatchSubscription = this.stopwatch.subscribe(secondsPassed => {
            this.counter = this.start + secondsPassed;

            this.secondsDisplay = this.getSeconds(this.counter);
            this.minutesDisplay = this.getMinutes(this.counter);
            this.hoursDisplay = this.getHours(this.counter);
        });
      } else {        
        this.stopped = true;
        if (this.stopwatchSubscription) this.stopwatchSubscription.unsubscribe();
      }        
    }

    pauseResumeTimer() {
      //debugger;
      if (this.waitText == 'Wait') {
        this.start = ++this.counter;
        this.paused = true;
        this.waitText = 'Resume';        
        if (this.stopwatchSubscription) this.stopwatchSubscription.unsubscribe();
      } else {                
        this.waitText = 'Wait';
        this.startStopTimer();
      }      
    }

    resetTimer() {
      this.startText = 'Start';
      this.waitText = 'Wait';
      this.start = 0;
      this.counter = 0;
      this.stopped = false;
      this.paused = false;

      this.minutesDisplay = 0;
      this.hoursDisplay = 0;
      this.secondsDisplay = 0;

      if (this.stopwatchSubscription) this.stopwatchSubscription.unsubscribe();        
    }

  private getSeconds(ticks: number) {
      return this.pad(ticks % 60);
  }

  private getMinutes(ticks: number) {
       return this.pad((Math.floor(ticks / 60)) % 60);
  }

  private getHours(ticks: number) {
      return this.pad(Math.floor((ticks / 60) / 60));
  }

  private pad(digit: any) { 
      return digit <= 9 ? '0' + digit : digit;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.stopwatchSubscription) this.stopwatchSubscription.unsubscribe(); 
  }

}