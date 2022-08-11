import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  public loadingInProgress = new BehaviorSubject(false);
  private eventBusServiceSubscriptions: Subscription = new Subscription();

  private onWindowScrollHandler = null;

  private readonly PHOTOS_PER_PAGE = 3 * 8;
  private readonly PHOTO_HEIGHT = 300;
  private readonly GRID_VERTICAL_SPACING = 100;
  
  @ViewChild('galleryContainer', {static: false}) galleryContainer: ElementRef<HTMLDivElement>;



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
    this.eventBusServiceSubscriptions.unsubscribe();

    if(this.onWindowScroll != null) {
      window.removeEventListener('scroll', this.onWindowScroll, true);
    }
  }



  private init() {
    if(!this.favouritesState.isLoaded()) {
      return;
    }


    this.onWindowScrollHandler = (e) => this.onWindowScroll(e);
    window.addEventListener('scroll', this.onWindowScrollHandler, true);

    this.loadMorePhotos();
  }

  private loadMorePhotos() {
    this.loadingInProgress.next(true);
      
    // Promises to load more photo urls
    const randomPhotoUrlsPromises: Promise<any>[] = (() => {
      let promisesList: Promise<any>[] = [];
      for(let i=0 ; i<this.PHOTOS_PER_PAGE ; i++) {
        promisesList.push(this.photoService.getRandomPhotoUrl().toPromise());
      }
      return promisesList;
    })();
      
    // wait for all Promises(that return photo urls) to be completed 
    Promise.allSettled(randomPhotoUrlsPromises)
    .then((results) => {
      const newPhotos = results
                        .filter((res) => res.status === 'fulfilled')
                        .map((res) => {
                          const photoUrl = (<any>res).value;
                          const photoId = photoUrl.substring(photoUrl.indexOf('?hmac=')+('?hmac=').length);

                          return {
                            id: photoId,
                            url: photoUrl
                          };
                        });

      this.photos = [...this.photos, ...newPhotos];
      this.cd.markForCheck();
      this.loadingInProgress.next(false);
    });
  }

  private onWindowScroll(e) {
    if(this.galleryContainer == null || e.target !== this.galleryContainer.nativeElement) {
      return;
    }

    const galleryContainerEl = this.galleryContainer.nativeElement;
    const maxScroll = galleryContainerEl.scrollHeight;
    const currentScroll = galleryContainerEl.clientHeight + galleryContainerEl.scrollTop;
    const bufferSpacing = this.PHOTO_HEIGHT + this.GRID_VERTICAL_SPACING;
    const isScrolledToBottom = (maxScroll - currentScroll) <= bufferSpacing;

    if(!isScrolledToBottom || this.loadingInProgress.getValue()) {
      return;
    }

    this.loadMorePhotos();
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