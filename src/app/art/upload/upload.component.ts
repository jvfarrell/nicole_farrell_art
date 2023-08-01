import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArtworkService } from '../artwork.service';
import { ArtworkUpload } from 'src/app/models/artwork.model';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  uploadForm: FormGroup;


  constructor(private formBuilder: FormBuilder, private artworkService: ArtworkService) {
    this.uploadForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      categoryMaterial: ['', Validators.required],
      dimensions: ['', Validators.required],
      imageFile: [null, Validators.required],
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.uploadForm.patchValue({
        imageFile: file,
      });
    }
  }

  onSubmit() {
    if (this.uploadForm.valid) {
      const formData = {
        title: this.uploadForm.value.title,
        description: this.uploadForm.value.description,
        price: this.uploadForm.value.price,
        dimensions: this.uploadForm.value.dimensions,
        filename: this.uploadForm.value.imageFile
      }
      // formData.title= this.uploadForm.value.title;
      // formData.append('description', this.uploadForm.value.description);
      // formData.append('price', this.uploadForm.value.price);
      // formData.append('dimensions', this.uploadForm.value.dimensions);
      // formData.append('description', this.uploadForm.value.description);
      // formData.append('filename', this.uploadForm.value.imageFile);

      this.artworkService.uploadArtwork(formData, this.uploadForm.value.imageFile);


      // .subscribe(
      //   () => {
      //     console.log('Artwork uploaded successfully');
      //     // Reset the form after successful upload
      //     this.uploadForm.reset();
      //   },
      //   (error) => {
      //     console.error('Error uploading artwork:', error);
      //     // Handle error here, show error message to the user
      //   }
      // );
      this.uploadForm.reset();
    }
  }

  ngOnInit(): void {
  }

}
