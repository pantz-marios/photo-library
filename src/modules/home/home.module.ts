import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeComponent } from './home.component';





@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule
  ],
  declarations: [
    HomeComponent
  ],
})
export class HomeModule {}
