import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { Storage } from '@angular/fire/storage';
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { CollectionReference, doc, docData, Firestore } from '@angular/fire/firestore';
import { collection, collectionData} from '@angular/fire/firestore';

import { Artwork, ArtworkUpload } from '../models/artwork.model';

import { from, Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { TransferState } from '@angular/platform-browser';
import { traceUntilFirst } from '@angular/fire/performance';
import { getDownloadURL, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { keepUnstableUntilFirst } from '@angular/fire';

@Injectable({
  providedIn: 'root'
})
export class ArtworkService {

  /**
   * injects Storage and Firestore into ArtService
   * needs the following methods
   *  Firestore
   *    1. Get list of Artwork
   *    2. Get top 3 artwork by Date
   *    3. Upload Artwork details
   *  Storage
   *    4. Get Artwork by name
   *    5. Upload artwork and return downloadUrl
   *
   * In our components we can then inject ArtworkService in their constructors
   * We can have the homepage use the Get Top 3 by date
   *    this in turn will call the get artwork by name (4).
   */

  private storage: Storage;
  private firestore: Firestore;
  private artCollection: CollectionReference;

  public readonly downloadUrl$: Observable<string>;
  public readonly testDocValue$: Observable<any>;
  artwork$: Observable<Artwork[]>;





  //example as is will get a single image from Storage
  constructor(storage: Storage, firestore: Firestore) {
    const TRANSPARENT_PNG
  = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

    this.storage = storage;
    this.firestore = firestore;

    const icon = ref(storage, 'volcano-fronds.png');
    this.downloadUrl$ = from(getDownloadURL(icon)).pipe(
      keepUnstableUntilFirst,
      traceUntilFirst('storage'),
      startWith(TRANSPARENT_PNG),
    );

    this.artCollection = collection(firestore, 'art');

    this.artwork$ = collectionData(this.artCollection) as Observable<Artwork[]>;
    // const ref = doc(firestore, 'art/');
    // this.testDocValue$ = docData(ref).pipe(
    //   traceUntilFirst('firestore')
    // );
  }


  // createArtwork(data: Artwork) {
  //   return this.artworkCollection.add(data);
  // }

  // editArtwork(artworkId: string, artwork: Artwork) {
  //   return this.artworkCollection.doc(artworkId).update(artwork);
  // }

  // getAllArtwork() {
  //   return this.artworkCollection.valueChanges({ idField: 'id' });
  // }

  // getRecentArtwork() {
  //   return this.artCollection
  //     .valueChanges({ idField: 'id', orderBy: 'dateCreated', limit: 3 });
  // }

  // Method to upload artwork to Firebase Storage and store details in Firestore
  // uploadArtwork(artwork: any, imageFile: File) {

  //   const storage = getStorage();

  //   // Upload the image file to Firebase Storage
  //   const fileRef = ref(storage, `artwork-images/${imageFile.name}`);
  //   const uploadTask = uploadBytesResumable(fileRef, imageFile);

  //   // Listen for state changes, errors, and completion of the upload.
  //   uploadTask.on('state_changed',
  //     (snapshot) => {
  //       // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       console.log('Upload is ' + progress + '% done');
  //       switch (snapshot.state) {
  //         case 'paused':
  //           console.log('Upload is paused');
  //           break;
  //         case 'running':
  //           console.log('Upload is running');
  //           break;
  //       }
  //     },
  //     (error) => {
  //       // A full list of error codes is available at
  //       // https://firebase.google.com/docs/storage/web/handle-errors
  //       switch (error.code) {
  //         case 'storage/unauthorized':
  //           // User doesn't have permission to access the object
  //           break;
  //         case 'storage/canceled':
  //           // User canceled the upload
  //           break;

  //         // ...

  //         case 'storage/unknown':
  //           // Unknown error occurred, inspect error.serverResponse
  //           break;
  //       }
  //     },
  //     () => {
  //       // Upload completed successfully, now we can get the download URL
  //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //         console.log('File available at', downloadURL);
  //       });
  //     }
  //   );

    // // Get the download URL once the upload is complete
    // return task.snapshotChanges().pipe(
    //   finalize(() => {
    //     fileRef.getDownloadURL().subscribe((imageUrl) => {
    //       // Add the artwork details to Firestore
    //       artwork.imageUrl = imageUrl;
    //       artwork.dateCreated = new Date();
    //       this.artworkCollection.add(artwork);
    //     });
    //   })
    // );
  }


