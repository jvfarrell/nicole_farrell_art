import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent implements OnInit {

  isHovering: boolean;

  files: File[] = [];
  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  // onDrop(files: FileList) {
  onDrop(input: HTMLInputElement) {
    if(!input.files) {
      console.log("no files");
      return
    }

    console.log("file found");

    const files: FileList = input.files;

    for (let index = 0; index < files.length; index++) {
      console.log(`Uploading ${files.item(index).name}`);
      this.files.push(files.item(index));
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
