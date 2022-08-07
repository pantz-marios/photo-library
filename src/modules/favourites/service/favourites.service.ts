import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Photo } from '@modules/photos/service/photo.model';





@Injectable({
  providedIn: 'root'
})
export class FavouritesService {
  
  constructor() {}



  public getFavourites(): Observable<any> {
    return from(
      new Promise((resolve, reject) => {
        resolve(JSON.parse(localStorage.getItem('favourites')));
      }));
  }

  public saveFavourites(photos: Photo[]): Observable<any> {
    return from(new Promise((resolve, reject) => {
      localStorage.setItem('favourites', JSON.stringify(photos));
      resolve(null);
    }));
  }

}