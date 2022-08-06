import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PhotosRoutingModule } from './photos-routing.module';
import { PhotosComponent } from './photos.component';





@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    PhotosRoutingModule
  ],
  declarations: [
    PhotosComponent
  ],
})
export class PhotosModule {}
