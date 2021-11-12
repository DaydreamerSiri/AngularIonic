import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HttprequestsPageRoutingModule } from './httprequests-routing.module';

import { HttprequestsPage } from './httprequests.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttprequestsPageRoutingModule
  ],
  declarations: [HttprequestsPage]
})
export class HttprequestsPageModule {}
