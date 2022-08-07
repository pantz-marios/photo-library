import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { EventBusService, AppEvent } from '@modules/event-bus/event-bus.service';
import { FavouritesState } from '@modules/favourites/state/favourites.state';
import { FavouritesEvent } from '@modules/favourites/state/favourites.events';
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
  private eventBusServiceSubscriptions: Subscription = new Subscription();

  private readonly PHOTOS_COUNT = 30;



  constructor(
    private cd: ChangeDetectorRef,
    private eventBusService: EventBusService,
    private favouritesState: FavouritesState,
    private photoService: PhotoService
  ) {}


  public ngOnInit() {

    // when favourite photos are loaded(from FavouritesState), load component
    const eventSubscription = this.eventBusService.on(FavouritesEvent.Init).subscribe((e: AppEvent) => this.init());
    this.eventBusServiceSubscriptions.add(eventSubscription);

    this.favouritesState.init();

    this.init();
  }

  public ngOnDestroy() {

  }


  private init() {
    if(!this.favouritesState.isLoaded()) {
      return;
    }


    //
    // The following should be replaced when infinite scrolling is implemented. 
    //
    for(let i=0 ; i<this.PHOTOS_COUNT ; i++) {
      this.photoService.getRandomPhotoUrl().subscribe(
        (photoUrl) => {
          const photoId = photoUrl.substring(photoUrl.indexOf('?hmac=')+('?hmac=').length);
          this.photos = [...this.photos, {
            id: photoId,
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


  public onPhotoClick(photo: Photo) {
    if(!this.favouritesState.isLoaded()) {
      return;
    }

    this.favouritesState.addPhoto(photo)
    .then(() => {
      console.log('photo added');
    });
  }

  public onImageLoaded(el, imgPlaceholderEl: HTMLSpanElement) {
    if(imgPlaceholderEl == null) {
      return;
    }

    imgPlaceholderEl.style.display = 'none';
    this.cd.markForCheck();
  }

}