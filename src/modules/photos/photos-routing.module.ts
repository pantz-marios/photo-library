import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhotosComponent } from './photos.component';





const routes: Routes = [
  { path: ':photoId', component: PhotosComponent, data: {} },
  { path: '', redirectTo: '/' },
];





@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class PhotosRoutingModule {}
