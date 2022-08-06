import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';





@Component({
  selector: 'favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavouritesComponent implements OnInit {


  constructor() {}


  public ngOnInit() {

  }

  public ngOnDestroy() {

  }

}