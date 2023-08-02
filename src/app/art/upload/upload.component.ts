import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { TransferState } from '@angular/platform-browser';
import { traceUntilFirst } from '@angular/fire/performance';
import { getDownloadURL, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { keepUnstableUntilFirst } from '@angular/fire';

const TRANSPARENT_PNG
  = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  private readonly storage: Storage;

  public readonly downloadUrl$: Observable<string>;

  constructor(storage: Storage) {
    this.storage = storage;
    const icon = ref(storage, 'volcano-fronds.png');
    this.downloadUrl$ = from(getDownloadURL(icon)).pipe(
      keepUnstableUntilFirst,
      traceUntilFirst('storage'),
      startWith(TRANSPARENT_PNG),
    );
  }

    uploadFile(input: HTMLInputElement) {
        if (!input.files) return

        const files: FileList = input.files;

        for (let i = 0; i < files.length; i++) {
            const file = files.item(i);
            if (file) {
                const storageRef = ref(this.storage, file.name);
                uploadBytesResumable(storageRef, file);
            }
        }
    }


  }

