import { Component, OnInit } from '@angular/core';
import { TreeService } from './tree.service';
import {FlatTreeControl, NestedTreeControl, TreeControl } from '@angular/cdk/tree';
import { FlatRootNode, IRootNode} from './node';
import {ArrayDataSource, SelectionModel} from '@angular/cdk/collections';
import { DragDrop } from '@angular/cdk/drag-drop';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root-tree',
  templateUrl: './root-tree.page.html',
  styleUrls: ['./root-tree.page.scss'],
})
export class RootTreePage implements OnInit {
  public nodelist = this.servtree.returnNodes();
  public treeControl: TreeControl<IRootNode> = new NestedTreeControl<IRootNode>(node => node.children);
  public dataSource: ArrayDataSource<IRootNode> = new ArrayDataSource<IRootNode>(this.nodelist);
  public flatdataSource: MatTreeFlatDataSource<IRootNode, FlatRootNode>;
  public flatTree: FlatTreeControl<FlatRootNode>;
  public flattener: MatTreeFlattener<IRootNode, FlatRootNode>;

  expansionModel = new SelectionModel<string>(true);

  dragging = false;
  expandTimeout: any;
  expandDelay = 1000;

  constructor(private servtree: TreeService,) {
    this.flattener = new MatTreeFlattener(this.transformer, this.getLevel,
    this.isExpandable, this.getChildren);
    this.flatTree = new FlatTreeControl<FlatRootNode>(this.getLevel, this.isExpandable);
    this.flatdataSource = new MatTreeFlatDataSource(this.flatTree, this.flattener);
  }

  ngOnInit() {
    this.nodelist = JSON.parse(localStorage.getItem('treeState')); //this.servtree.structureNodeTree(this.nodelist);
    //localStorage.setItem('treeState', JSON.stringify(this.nodelist));
    this.rebuildTreeForData(this.nodelist);
    console.log(this.flatdataSource);
    console.log(this.flattener);
  }


  rebuildTreeForData(data: any) {
    this.flatdataSource.data = data;
    this.expansionModel.selected.forEach((id) => {
        const node = this.flatTree.dataNodes.find((n) => n.id === id);
        this.flatTree.expand(node);
      });
  }

  buildRootTree(obj: {[key: string]: any}, level: number, parentId: string = '0'): IRootNode[] {
    return Object.keys(obj).reduce<IRootNode[]>((accumulator, key, idx) => {
      const value = obj[key];
      let node: IRootNode;
      node.id = parseInt(key, 2);
      node.id = parseInt(`${parentId}/${idx}`, 2);
      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildRootTree(value, level + 1, node.id.toString());
        } else {
          //node.type = value;
        }
      }
      return accumulator.concat(node);
    }, []);
  }

  drop(event){
    console.log(event);
  }

  hasChild = (_: number, node: FlatRootNode) =>
    !!node.hasChildren && node.hasChildren.length > 0;


    dragStart() {
      this.dragging = true;
    }
    dragEnd() {
      this.dragging = false;
    }
    dragHover(node: FlatRootNode) {
      if (this.dragging) {
        clearTimeout(this.expandTimeout);
        this.expandTimeout = setTimeout(() => {
          this.treeControl.expand(node);
        }, this.expandDelay);
      }
    }
    dragHoverEnd() {
      if (this.dragging) {
        clearTimeout(this.expandTimeout);
      }
    }



  private transformer = (node: IRootNode, level: number) => new FlatRootNode(
      node.id, node.name, !!node.children, level, node.children);

  private getLevel = (node: FlatRootNode) => node.nodelevel;
  private isExpandable = (node: FlatRootNode) => node.expandable;
  private getChildren = (node: IRootNode): Observable<IRootNode[]> => of(node.children);

}
