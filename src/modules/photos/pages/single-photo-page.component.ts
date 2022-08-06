import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';





@Component({
  selector: 'single-photo-page',
  templateUrl: './single-photo-page.component.html',
  styleUrls: ['./single-photo-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SinglePhotoPageComponent implements OnInit {


  constructor() {}


  public ngOnInit() {

  }

  public ngOnDestroy() {

  }

}