import { Component, OnInit, Input } from '@angular/core';
import { Artwork } from 'src/app/models/artwork.model';

@Component({
  selector: 'app-featured-art',
  templateUrl: './featured-art.component.html',
  styleUrls: ['./featured-art.component.scss']
})
export class FeaturedArtComponent implements OnInit {
  @Input() artwork: Artwork;


  constructor() { }

  ngOnInit(): void {
  }

}
