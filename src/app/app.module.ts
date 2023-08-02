import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

// 1. Import the libs you need
import { environment } from '../environments/environment';
import { HomePageComponent } from './home-page/home-page.component';
import { AboutComponent } from './home-page/about/about.component';
import { FeaturedArtComponent } from './home-page/featured-art/featured-art.component';
import { TempFeaturedArtComponent } from './home-page/temp-featured-art/temp-featured-art.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideFirestore, getFirestore } from "@angular/fire/firestore";
import { getAuth, provideAuth } from '@angular/fire/auth';

@NgModule({
  declarations: [AppComponent, HomePageComponent, AboutComponent, FeaturedArtComponent, TempFeaturedArtComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
