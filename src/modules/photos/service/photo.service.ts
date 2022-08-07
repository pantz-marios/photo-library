import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { environment } from '@env/environment';





@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  
  constructor() {}



  public getRandomPhotoUrl(): Observable<any> {
    const randomPhotoServiceUrl = `${environment.API_URL}`;

    return from(new Promise((resolve, reject) => {
      fetch(randomPhotoServiceUrl)
      .then(
        (response) => resolve(response.url),
        (error) => reject(error)
      )
      .catch((error) => reject(error));
    }));
  }

}