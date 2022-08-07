import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FavouritesRoutingModule } from './favourites-routing.module';
import { FavouritesPageComponent } from './pages/favourites-page.component';
import { FavouritePhotoGalleryComponent } from './components/favourite-photo-gallery/favourite-photo-gallery.component';
import { ImageLoaderModule } from '@modules/shared/directives/image-loader.module';





@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FavouritesRoutingModule,
    ImageLoaderModule
  ],
  declarations: [
    FavouritesPageComponent,
    FavouritePhotoGalleryComponent
  ],
})
export class FavouritesModule {}
