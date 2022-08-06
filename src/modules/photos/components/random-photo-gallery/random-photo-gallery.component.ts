import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Photo } from '@modules/photos/service/photo.model';
import { PhotoService } from '@modules/photos/service/photo.service';





@Component({
  selector: 'random-photo-gallery',
  templateUrl: './random-photo-gallery.component.html',
  styleUrls: ['./random-photo-gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RandomPhotoGalleryComponent implements OnInit {

  public photos: Photo[] = [];

  private readonly PHOTOS_COUNT = 30;



  constructor(
    private cd: ChangeDetectorRef,
    private photoService: PhotoService
  ) {}


  public ngOnInit() {


    //
    // The following should be replaced when infinite scrolling is implemented. 
    //
    for(let i=0 ; i<this.PHOTOS_COUNT ; i++) {
      this.photoService.getRandomPhoto().subscribe(
        (photoUrl) => {
          this.photos = [...this.photos, {
            url: photoUrl
          }];

          this.cd.markForCheck();
          console.log(photoUrl);
        },
        (error) => {
          console.log(error);
        }
      );
    }

  }

  public ngOnDestroy() {

  }



  public onImageLoaded(el, imgPlaceholderEl: HTMLSpanElement) {
    if(imgPlaceholderEl == null) {
      return;
    }

    imgPlaceholderEl.style.display = 'none';
    this.cd.markForCheck();
  }

}