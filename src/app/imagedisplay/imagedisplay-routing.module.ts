import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImagedisplayPage } from './imagedisplay.page';

const routes: Routes = [
  {
    path: '',
    component: ImagedisplayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImagedisplayPageRoutingModule {}
