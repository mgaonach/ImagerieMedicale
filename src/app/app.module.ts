import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { AppComponent } from './app.component';
import { CanvasRendererComponent } from './canvas-renderer/canvas-renderer.component';
import { FIREBASE_AUTH } from './firebase.config';

@NgModule({
  declarations: [
    AppComponent,
    CanvasRendererComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(FIREBASE_AUTH),
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
