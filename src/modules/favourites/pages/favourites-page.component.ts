import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';





@Component({
  selector: 'favourites-page',
  templateUrl: './favourites-page.component.html',
  styleUrls: ['./favourites-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavouritesPageComponent implements OnInit {


  constructor() {}


  public ngOnInit() {

  }

  public ngOnDestroy() {

  }

}