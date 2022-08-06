import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavouritesComponent } from './favourites.component';





const routes: Routes = [
  { path: '', component: FavouritesComponent, data: {} }
];





@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class FavouritesRoutingModule {}
