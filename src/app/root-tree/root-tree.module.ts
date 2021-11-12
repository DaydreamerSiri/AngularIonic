import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RootTreePageRoutingModule } from './root-tree-routing.module';

import { RootTreePage } from './root-tree.page';
import { TreeModule } from '@circlon/angular-tree-component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RootTreePageRoutingModule,
    TreeModule
  ],
  declarations: [RootTreePage]
})
export class RootTreePageModule {}
