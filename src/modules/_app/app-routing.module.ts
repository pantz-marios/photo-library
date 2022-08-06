import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from '@modules/home/home.component';





const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'photos', loadChildren: 'modules/photos/photos.module#PhotosModule' },
  { path: 'favourites', loadChildren: 'modules/favourites/favourites.module#FavouritesModule' },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];





@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
