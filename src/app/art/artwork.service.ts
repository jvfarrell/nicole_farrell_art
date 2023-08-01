import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Storage } from '@angular/fire/storage';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Artwork, ArtworkUpload } from '../models/artwork.model';


@Injectable({
  providedIn: 'root'
})
export class ArtworkService {

  private artworkCollection: AngularFirestoreCollection<Artwork>;

  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth,) { // private storage: Storage = inject(Storage)
    this.artworkCollection = this.firestore.collection<Artwork>('artwork');

  }

  createArtwork(data: Artwork) {
    return this.artworkCollection.add(data);
  }

  editArtwork(artworkId: string, artwork: Artwork) {
    return this.artworkCollection.doc(artworkId).update(artwork);
  }

  getAllArtwork() {
    return this.artworkCollection.valueChanges({ idField: 'id' });
  }

  getRecentArtwork() {
    return this.artworkCollection
      .valueChanges({ idField: 'id', orderBy: 'dateCreated', limit: 3 });
  }

  // Method to upload artwork to Firebase Storage and store details in Firestore
  uploadArtwork(artwork: any, imageFile: File) {

    const storage = getStorage();

    // Upload the image file to Firebase Storage
    const fileRef = ref(storage, `artwork-images/${imageFile.name}`);
    const uploadTask = uploadBytesResumable(fileRef, imageFile);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
        });
      }
    );

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

}
