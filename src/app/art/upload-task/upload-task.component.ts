import { Component, OnInit, Input, ChangeDetectorRef, inject} from '@angular/core';
// import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
// import { AngularFirestore } from '@angular/fire/firestore';
import { Firestore, collection, collectionData, addDoc} from '@angular/fire/firestore';
import { Storage, ref, uploadBytesResumable, getDownloadURL, UploadTask, StorageReference } from '@angular/fire/storage';

import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';


@Component({
  selector: 'upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.scss']
})
export class UploadTaskComponent implements OnInit {
  private storage: Storage = inject(Storage);

  // private firestore: Firestore
  // private storage: Storage
  // private artRef: StorageReference

  @Input() file: (File);

  task: UploadTask;

  percentage: Observable<number>; // progress
  snapshot: Observable<any>;
  downloadURL;

  constructor() {
    // this.firestore = inject(Firestore); // inject Cloud Firestore
    // this.storage = inject(Storage);
    // this.artRef = ref(this.storage, 'art');
  }

  ngOnInit() {
    console.log('upload-task init');
    console.log(this.file);
    this.uploadFile();
  }

  uploadFile() {
    console.log(`Uploading File in upload-task`);
    const storageRef = ref(this.storage, 'art/' + this.file.name);
    console.log(`StorageRef`);
    console.log(storageRef);
    this.task = uploadBytesResumable(storageRef, this.file);

    this.task.on('state_changed'),
      (snapshot) => {
        this.snapshot = snapshot;
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //this.percentage = progress.toPromise();
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
        getDownloadURL(this.task.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
        });
      }
  }


  // startUpload() {

  //   // The storage path
  //   const path = `test/${Date.now()}_${this.file.name}`;

  //   // Reference to storage bucket
  //   const ref = this.storage.ref(path);

  //   // The main task
  //   this.task = this.storage.upload(path, this.file);

  //   // Progress monitoring
  //   this.percentage = this.task.percentageChanges();

  //   this.snapshot   = this.task.snapshotChanges().pipe(
  //     tap(console.log),
  //     // The file's download URL
  //     finalize( async() =>  {
  //       this.downloadURL = await ref.getDownloadURL().toPromise();

  //       // adds the download url (for Storage) to our file in the firestore collection
  //       // this is where I need to update the art collection later
  //       this.db.collection('files').add( { downloadURL: this.downloadURL, path });
  //     }),
  //   );
  // }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

}
