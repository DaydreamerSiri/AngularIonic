import { Component, OnInit } from '@angular/core';
import { TreeService } from './tree.service';
import {NestedTreeControl } from '@angular/cdk/tree';
import { IRootNode} from './node';
import {ArrayDataSource} from '@angular/cdk/collections';

@Component({
  selector: 'app-root-tree',
  templateUrl: './root-tree.page.html',
  styleUrls: ['./root-tree.page.scss'],
})
export class RootTreePage implements OnInit {
  public nodelist = this.servtree.returnNodes();
  public treeControl: NestedTreeControl<IRootNode> = new NestedTreeControl<IRootNode>(node => node.children);
  public dataSource: ArrayDataSource<IRootNode> = new ArrayDataSource<IRootNode>(this.nodelist);

  constructor(private servtree: TreeService,) {
  }

  ngOnInit() {
    this.nodelist = JSON.parse(localStorage.getItem('treeState')); //this.servtree.structureNodeTree(this.nodelist);
    //localStorage.setItem('treeState', JSON.stringify(this.nodelist));
    console.log(this.dataSource);
    console.log(this.treeControl.dataNodes);
  }

}
