import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HttprequestsPage } from './httprequests.page';

const routes: Routes = [
  {
    path: '',
    component: HttprequestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HttprequestsPageRoutingModule {}
