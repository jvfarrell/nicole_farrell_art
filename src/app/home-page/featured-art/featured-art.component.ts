import { Component, OnInit, Input} from '@angular/core';
import { Observable } from 'rxjs';
import { traceUntilFirst } from '@angular/fire/performance';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { Artwork } from 'src/app/models/artwork.model';

@Component({
  selector: 'app-featured-art',
  templateUrl: './featured-art.component.html',
  styleUrls: ['./featured-art.component.scss']
})
export class FeaturedArtComponent implements OnInit {
  @Input() artwork: Artwork;

  public readonly testDocValue$: Observable<any>;

  constructor(firestore: Firestore) {
    // const ref = doc(firestore, this.artwork.filename);
    // this.testDocValue$ = docData(ref).pipe(
    //   traceUntilFirst('firestore')
    // );
  }

  ngOnInit(): void {
  }

}
