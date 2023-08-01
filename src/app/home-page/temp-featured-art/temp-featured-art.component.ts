import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-temp-featured-art',
  templateUrl: './temp-featured-art.component.html',
  styleUrls: ['./temp-featured-art.component.scss']
})
export class TempFeaturedArtComponent implements OnInit {
  featuredArtworks: string[] = [
    'assets/temp_art/1.png',
    'assets/temp_art/2.png',
    'assets/temp_art/3.png',
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
