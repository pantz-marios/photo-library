import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EventBusService } from '@modules/event-bus/event-bus.service';
import { Photo } from '@modules/photos/service/photo.model';
import { FavouritesEvent } from './favourites.events';
import { FavouritesService } from '../service/favourites.service';





@Injectable({
  providedIn: 'root'
})
export class FavouritesState {
  private initialized = false;
  private loaded: boolean = false;

  private photosObserved: BehaviorSubject<Photo[]> = new BehaviorSubject(null);
  private photosObservable: Observable<Photo[]> = this.photosObserved.asObservable();



  constructor(
    private eventBusService: EventBusService,
    private favouritesService: FavouritesService
  ) {}



  public init(): void {
    if(this.initialized) {
      return;
    }
  
    this.initialized = true;


    // fetch favourite photos
    this.favouritesService.getFavourites().subscribe((favouritePhotos: Photo[]) => {
      if(favouritePhotos == null) {
        const newPhotos = [];
        this.favouritesService.saveFavourites(newPhotos).subscribe(() => {
          this.photosObserved.next(newPhotos);
          this.loaded = true;
          this.eventBusService.emit(FavouritesEvent.Init, newPhotos);
        });
      }
      else {
        this.photosObserved.next(favouritePhotos);
        this.loaded = true;
        this.eventBusService.emit(FavouritesEvent.Init, favouritePhotos);
      }
    });
  }

  public dispose() {
    this.initialized = false;
    this.loaded = false;
    this.photosObserved = new BehaviorSubject(null);
    this.photosObservable = this.photosObserved.asObservable();
  }



  public isLoaded(): boolean {
    return this.loaded;
  }

  public getPhotosObservable(): Observable<Photo[]> {
    return this.photosObservable;
  }

  public getPhotos(): Photo[] {
    return this.photosObserved.getValue();
  }



  public addPhoto(photo: Photo): Promise<any> {
    const photos = this.getPhotos();
    const newPhotos = [...photos, photo];

    return new Promise((resolve, reject) => {
      this.favouritesService.saveFavourites(newPhotos).subscribe(() => {
        this.photosObserved.next(newPhotos);
        this.eventBusService.emit(FavouritesEvent.Add, photo);
        resolve(newPhotos);
      });
    });
  }

  public deletePhoto(photoId: string): Promise<any> {
    const photos = this.getPhotos();
		const photoIndex = photos.findIndex((p) => p.id === photoId);


    return new Promise((resolve, reject) => {
      if(photoIndex < 0) {
        reject(null);
      }
  
      const deletedPhoto = photos.filter((p) => p.id === photoId)[0];
      photos.splice(photoIndex, 1);
      const newPhotos = [...photos];

      this.favouritesService.saveFavourites(newPhotos).subscribe(() => {
        this.photosObserved.next(newPhotos);
        this.eventBusService.emit(FavouritesEvent.Delete, deletedPhoto);
        resolve(newPhotos);
      });
    });
  }

}