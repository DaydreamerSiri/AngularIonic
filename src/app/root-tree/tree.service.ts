import { Injectable } from '@angular/core';
import nodes from '../../assets/json/nodes.json';
import { ITreeModel } from '@circlon/angular-tree-component/lib/defs/api';
import { TreeNode } from '@circlon/angular-tree-component';
import { IRootNode } from './node';

@Injectable({
  providedIn: 'root'
})
export class TreeService{
  public node: IRootNode[] = nodes;

  constructor() {
   }
  returnNodes(){
    return [...this.node];
  }

  structureNodeTree(treenodes: Array<any>){
    treenodes = this.reorderNodePositionbyID(treenodes);
    treenodes = this.reorderNodePosition(treenodes);
    return treenodes;
  }

  reorderNodePosition(treenodes: Array<any>){
    const duplicateList = [];
    treenodes.forEach(val => duplicateList.push(Object.assign({}, val)));
    for (let i = 0; i < treenodes.length; i++) {
      try{
        if (treenodes[i].pos < treenodes[i+1].pos) {
          duplicateList[i].children = this.reorderNodePosition(treenodes[i].children);
          continue;
        }
        else{
          console.log('swapping');
          [duplicateList[i].pos, duplicateList[i+1].pos] = [duplicateList[i+1].pos, duplicateList[i].pos];
          duplicateList[i].children = this.reorderNodePosition(treenodes[i].children);
        }
      }
      catch(e){
      }
    }
    return duplicateList;
  }


  reorderNodePositionbyID(treenodes: Array<any>){
    const duplicateList = [];
    treenodes.forEach(val => duplicateList.push(Object.assign({}, val)));
    for (let i = 0; i < treenodes.length; i++) {
      try{
        if (treenodes[i].id < treenodes[i+1].id) {
          duplicateList[i].children = this.reorderNodePositionbyID(treenodes[i].children);
          continue;
        }
        else{
          console.log('swapping');
          [duplicateList[i], duplicateList[i+1]] = [duplicateList[i+1], duplicateList[i]];
          duplicateList[i].children = this.reorderNodePositionbyID(treenodes[i].children);
        }
      }
      catch(e){
      }
    }
    return duplicateList;
  }
}
