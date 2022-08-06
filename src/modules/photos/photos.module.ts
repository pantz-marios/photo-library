import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PhotosRoutingModule } from './photos-routing.module';
import { SinglePhotoPageComponent } from './pages/single-photo-page.component';
import { RandomPhotoGalleryComponent } from './components/random-photo-gallery/random-photo-gallery.component';
import { ImageLoaderModule } from '@modules/shared/directives/image-loader.module';





@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    PhotosRoutingModule,
    ImageLoaderModule
  ],
  declarations: [
    SinglePhotoPageComponent,
    RandomPhotoGalleryComponent
  ],
  exports: [
    RandomPhotoGalleryComponent
  ]
})
export class PhotosModule {}
