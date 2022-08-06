import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FavouritesComponent } from './favourites.component';
import { FavouritesRoutingModule } from './favourites-routing.module';





@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FavouritesRoutingModule
  ],
  declarations: [
    FavouritesComponent
  ],
})
export class FavouritesModule {}
