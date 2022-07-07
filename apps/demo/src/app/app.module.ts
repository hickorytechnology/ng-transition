import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TimeoutRef } from '@hickorytechnology/ng-refs';
import { NgTransitionModule } from '@hickorytechnology/ng-transition';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [BrowserModule, NgTransitionModule],
  providers: [TimeoutRef],
  bootstrap: [AppComponent],
})
export class AppModule { }
