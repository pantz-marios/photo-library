import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeComponent } from './home.component';
import { PhotosModule } from '@modules/photos/photos.module';





@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    PhotosModule
  ],
  declarations: [
    HomeComponent
  ],
})
export class HomeModule {}
