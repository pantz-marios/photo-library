import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SinglePhotoPageComponent } from './pages/single-photo-page.component';





const routes: Routes = [
  { path: ':photoId', component: SinglePhotoPageComponent, data: {} },
  { path: '', redirectTo: '/' },
];





@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class PhotosRoutingModule {}
