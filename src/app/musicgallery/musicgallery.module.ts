import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MusicgalleryPageRoutingModule } from './musicgallery-routing.module';

import { MusicgalleryPage } from './musicgallery.page';
import { PopoverComponent } from './popover/popover.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MusicgalleryPageRoutingModule,
    YouTubePlayerModule,
    Ng2SearchPipeModule
  ],
  declarations: [
    MusicgalleryPage,
    PopoverComponent,
  ],
  exports: [
    PopoverComponent,
    YouTubePlayerModule,
  ]
})
export class MusicgalleryPageModule {}
