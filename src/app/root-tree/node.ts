export interface IRootNode {
    id: string;
    name: string;
    children?: IRootNode[];
}

export class FlatRootNode implements IRootNode{
  id;
  name: string;
  expandable: boolean;
  level: number;
  children?: IRootNode[];

  constructor(
    public identifier,
    public nodename,
    public isExpandable,
    public nodelevel,
    public hasChildren?)
    {
    this.id = identifier;
    this.name = nodename;
    this.expandable = isExpandable;
    this.level = nodelevel;
    this.children = hasChildren;
  }
}

