import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';





@Component({
  selector: 'photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotosComponent implements OnInit {


  constructor() {}


  public ngOnInit() {

  }

  public ngOnDestroy() {

  }

}