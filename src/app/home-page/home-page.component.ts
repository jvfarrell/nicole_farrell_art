import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Artwork } from '../models/artwork.model';
import { ArtworkService } from '../art/artwork.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  recentArtwork: Artwork[] = [];

  artwork: Observable<Artwork[]>;

  constructor(private artworkService: ArtworkService) { }

  ngOnInit(): void {
    this.artwork = this.artworkService.artwork$;
  }
}
