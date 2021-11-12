import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RootTreePage } from './root-tree.page';

const routes: Routes = [
  {
    path: '',
    component: RootTreePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RootTreePageRoutingModule {}
