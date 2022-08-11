import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RippleLoaderComponent } from './ripple-loader.component';





@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    RippleLoaderComponent
  ],
  exports: [
    RippleLoaderComponent
  ]
})
export class RippleLoaderModule {}