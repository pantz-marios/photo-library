import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavouritesState } from '@modules/favourites/state/favourites.state';
import { Photo } from '@modules/photos/service/photo.model';





@Component({
  selector: 'favourite-photo-gallery',
  templateUrl: './favourite-photo-gallery.component.html',
  styleUrls: ['./favourite-photo-gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavouritePhotoGalleryComponent implements OnInit {
  public photos = this.favouritesState.getPhotosObservable();



  constructor(
    private cd: ChangeDetectorRef,
    private router: Router,
    private favouritesState: FavouritesState
  ) {}


  public ngOnInit() {
    this.favouritesState.init();
  }

  public ngOnDestroy() {

  }



  public onPhotoClick(photo: Photo) {
    const redirectionUrl = '/photos/' + photo.id;
    this.router.navigate([redirectionUrl], {replaceUrl: true});
  }

  public onImageLoaded(el, imgPlaceholderEl: HTMLSpanElement) {
    if(imgPlaceholderEl == null) {
      return;
    }

    imgPlaceholderEl.style.display = 'none';
    this.cd.markForCheck();
  }

}