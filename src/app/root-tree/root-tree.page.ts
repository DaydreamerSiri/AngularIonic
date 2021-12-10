import { Component, OnInit } from '@angular/core';
import { TreeService } from './tree.service';
import {FlatTreeControl, NestedTreeControl, TreeControl } from '@angular/cdk/tree';
import { FlatRootNode, IRootNode} from './node';
import {ArrayDataSource, SelectionModel} from '@angular/cdk/collections';
import { CdkDragDrop, DragDrop } from '@angular/cdk/drag-drop';
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
  validateDrop = false;

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
  }

  visibleNodes(): IRootNode[] {
    const result = [];

    const addExpandedChildren = (node: IRootNode, expanded: string[]) => {
      result.push(node);
      if (expanded.includes(node.id)) {
        node.children.map((child) => addExpandedChildren(child, expanded));
      }
    };
    this.flatdataSource.data.forEach((node) => {
      addExpandedChildren(node, this.expansionModel.selected);
    });
    return result;
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
      node.id = key;
      node.id = `${parentId}/${idx}`;
      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildRootTree(value, level + 1, node.id);
        } else {
          //node.type = value;
        }
      }
      return accumulator.concat(node);
    }, []);
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

  drop(event: CdkDragDrop<string[]>) {
    console.log('origin/destination', event.previousIndex, event.currentIndex);

    // ignore drops outside of the tree
    if (!event.isPointerOverContainer){return;}

    // construct a list of visible nodes, this will match the DOM.
    // the cdkDragDrop event.currentIndex jives with visible nodes.
    // it calls rememberExpandedTreeNodes to persist expand state
    const visibleNodes = this.visibleNodes();

    // deep clone the data source so we can mutate it
    const changedData = JSON.parse(JSON.stringify(this.flatdataSource.data));

    // recursive find function to find siblings of node
    const findNodeSiblings = (arr: Array<any>, id: string): Array<any> => {
      let result; let subResult;
      arr.forEach((item, i) => {
        if (item.id === id) {
          result = arr;
        } else if (item.children) {
          subResult = findNodeSiblings(item.children, id);
          if (subResult){result = subResult;};
        }
      });
      return result;

    };

    // determine where to insert the node
    const nodeAtDest = visibleNodes[event.currentIndex];
    const newSiblings = findNodeSiblings(changedData, nodeAtDest.id);
    console.log(newSiblings);
    if (!newSiblings){

      console.log("not a new Sibling");
      return;};
    const insertIndex = newSiblings.findIndex(s => s.id === nodeAtDest.id);

    // remove the node from its old place
    const node = event.item.data;
    const siblings = findNodeSiblings(changedData, node.id);
    const siblingIndex = siblings.findIndex(n => n.id === node.id);
    const nodeToInsert: IRootNode = siblings.splice(siblingIndex, 1)[0];
    if (nodeAtDest.id === nodeToInsert.id){return;};

    // ensure validity of drop - must be same level
    const nodeAtDestFlatNode = this.flatTree.dataNodes.find((n) => nodeAtDest.id === n.id);
    if (this.validateDrop && nodeAtDestFlatNode.level !== node.level) {
      alert('Items can only be moved within the same level.');
      return;
    }

    // insert node
    newSiblings.splice(insertIndex, 0, nodeToInsert);
    console.log(changedData);
    // rebuild tree with mutated data
    this.rebuildTreeForData(changedData);
  }


  private transformer = (node: IRootNode, level: number) => new FlatRootNode(
      node.id, node.name, !!node.children, level, node.children);

  private getLevel = (node: FlatRootNode) => node.nodelevel;
  private isExpandable = (node: FlatRootNode) => node.expandable;
  private getChildren = (node: IRootNode): Observable<IRootNode[]> => of(node.children);

}
