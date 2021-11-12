import { Component, OnInit } from '@angular/core';
import { TreeService } from './tree.service';

@Component({
  selector: 'app-root-tree',
  templateUrl: './root-tree.page.html',
  styleUrls: ['./root-tree.page.scss'],
})
export class RootTreePage implements OnInit {

  public nodelist = this.servtree.returnNodes();

  treeoptions = {
    allowDrag: true,
  };

   treenodelist = [];

  constructor(private servtree: TreeService) { }

  ngOnInit() {
    this.nodelist = JSON.parse(localStorage.getItem('treeState')); //this.servtree.structureNodeTree(this.nodelist);
    //localStorage.setItem('treeState', JSON.stringify(this.nodelist));
  }

  onUpdate(tree){
    const duplicateList = [];
    tree.treeModel.nodes.forEach(val => duplicateList.push(Object.assign({}, val)));
    for(let i = 0; i < tree.treeModel.nodes.length; i++) {
      try{
        duplicateList[i].pos = i;
        duplicateList[i].children = this.onMoveNodeChildren(duplicateList[i].children);
      }
      catch(e){
      }
    }
    tree.treeModel.nodes = duplicateList;
  }

  onMoveNode(tree){
    localStorage.setItem('treeState', JSON.stringify(tree.treeModel.nodes));
    window.location.reload();
  }


  onMoveNodeChildren(childNode){
    const duplicateList = [];
    childNode.forEach(val => duplicateList.push(Object.assign({}, val)));
    for(let i = 0; i < childNode.length; i++) {
      try{
        duplicateList[i].pos = i;
        duplicateList[i].children = this.onMoveNodeChildren(duplicateList[i].children);
      }
      catch(e){
      }

  }

  return duplicateList;
}
}
