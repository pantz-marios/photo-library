import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FavouritesPageComponent } from './pages/favourites-page.component';
import { FavouritesRoutingModule } from './favourites-routing.module';





@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FavouritesRoutingModule
  ],
  declarations: [
    FavouritesPageComponent
  ],
})
export class FavouritesModule {}
