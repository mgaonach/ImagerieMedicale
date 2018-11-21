import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { AppComponent } from './app.component';
import { CanvasRendererComponent } from './canvas-renderer/canvas-renderer.component';
import { FonctionnalitesComponent } from './fonctionnalites/fonctionnalites.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasRendererComponent,
    FonctionnalitesComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCftyGu09LoY8HxPE_eB6gpoPS9sn85x74",
      authDomain: "images-603e8.firebaseapp.com",
      storageBucket: "images-603e8.appspot.com",
      projectId: "images-603e8>",
    }),
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
