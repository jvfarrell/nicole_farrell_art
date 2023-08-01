import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempFeaturedArtComponent } from './temp-featured-art.component';

describe('TempFeaturedArtComponent', () => {
  let component: TempFeaturedArtComponent;
  let fixture: ComponentFixture<TempFeaturedArtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TempFeaturedArtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TempFeaturedArtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
