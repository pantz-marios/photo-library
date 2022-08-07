import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventBusService, AppEvent } from '@modules/event-bus/event-bus.service';
import { FavouritesState } from '@modules/favourites/state/favourites.state';
import { FavouritesEvent } from '@modules/favourites/state/favourites.events';





@Component({
  selector: 'single-photo-page',
  templateUrl: './single-photo-page.component.html',
  styleUrls: ['./single-photo-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SinglePhotoPageComponent implements OnInit {
  public photoId = null;
  public photoUrl = null;
  private routeParamsSubscription: Subscription = null;
  private eventBusServiceSubscriptions: Subscription = new Subscription();

  

  constructor(
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private eventBusService: EventBusService,
    private favouritesState: FavouritesState
  ) {}


  public ngOnInit() {

    // subscribe to route params in order to get 'machineName' route param and refresh component
    this.routeParamsSubscription = this.route.params.subscribe((params: any) => {
      this.photoId = params['photoId'];
      this.refresh();
    });

    // when favourite photos are loaded(from FavouritesState), load component
    const eventSubscription = this.eventBusService.on(FavouritesEvent.Init).subscribe((e: AppEvent) => this.refresh());
    this.eventBusServiceSubscriptions.add(eventSubscription);
    
    this.favouritesState.init();
  }

  public ngOnDestroy() {
    if(this.routeParamsSubscription != null) {
      this.routeParamsSubscription.unsubscribe();
    }

    this.eventBusServiceSubscriptions.unsubscribe();
  }


  private refresh() {
    if(!this.favouritesState.isLoaded() || this.photoId == null) {
      return;
    }

    const matchedPhotos = this.favouritesState.getPhotos().filter((p) => p.id === this.photoId);
    if(matchedPhotos.length > 0) {
      const photo = matchedPhotos[0];
      this.photoUrl = photo.url;
    }
  }



  public onImageLoaded(el, imgPlaceholderEl: HTMLSpanElement) {
    if(imgPlaceholderEl == null) {
      return;
    }

    imgPlaceholderEl.style.display = 'none';
    this.cd.markForCheck();
  }

}