import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MusicgalleryPage } from './musicgallery.page';
import { PopoverComponent } from './popover/popover.component';
const routes: Routes = [
  {
    path: '',
    component: MusicgalleryPage
  },
  {
    path: '',
    component: PopoverComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MusicgalleryPageRoutingModule {}
