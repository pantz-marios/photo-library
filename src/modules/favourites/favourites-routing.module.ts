import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavouritesPageComponent } from './pages/favourites-page.component';





const routes: Routes = [
  { path: '', component: FavouritesPageComponent, data: {} }
];





@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class FavouritesRoutingModule {}
