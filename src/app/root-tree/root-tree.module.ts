import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RootTreePageRoutingModule } from './root-tree-routing.module';

import { RootTreePage } from './root-tree.page';
import { TreeModule } from '@circlon/angular-tree-component';
import { IonicModule } from '@ionic/angular';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkTreeModule } from '@angular/cdk/tree';
import {MatTreeModule } from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RootTreePageRoutingModule,
    TreeModule,
    IonicModule,
    DragDropModule,
    CdkTreeModule,
    MatTreeModule,
    MatIconModule,
  ],
  declarations: [RootTreePage]
})
export class RootTreePageModule {}
