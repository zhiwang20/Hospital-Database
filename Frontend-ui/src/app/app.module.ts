import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AwesomeBarComponent } from './awesome-bar/awesome-bar.component';

declare global {
  interface Window {
    _custom: {
      checkIfExists: any
    };
  }
}

@NgModule({
  declarations: [
    AppComponent,
    AwesomeBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

(window as any)._custom = {
  checkIfExists(target: any, path: string) {
    // slightly modified version, original by http://stackoverflow.com/users/80860/kennebec
    const pathArr = path.split('.');
    let subpath = target[pathArr.shift()];
    while (subpath && pathArr.length) {
      subpath = subpath[pathArr.shift()];
    }
    return subpath;
  }
};
