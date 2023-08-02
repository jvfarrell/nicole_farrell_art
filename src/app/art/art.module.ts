import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtRoutingModule } from './art-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UploadComponent } from './upload/upload.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../../environments/environment';
import { DropzoneDirective } from './dropzone.directive';
import { UploadTaskComponent } from './upload-task/upload-task.component';
import { UploaderComponent } from './uploader/uploader.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';

import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { provideAuth, connectAuthEmulator, getAuth } from '@angular/fire/auth';


@NgModule({
  declarations: [UploadComponent, DropzoneDirective, UploadTaskComponent, UploaderComponent],
  imports: [
    CommonModule,
    ArtRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    // AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
  ]
})
export class ArtModule { }
