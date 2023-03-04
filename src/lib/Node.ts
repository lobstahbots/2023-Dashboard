export enum NodeState {
  Unscored,
  Selected,
  Scored,
}

export enum NodeType {
  Cone,
  Cube,
  Hybrid,
}

export default class Node {

  constructor(
    public row: number,
    public column: number,
    public state: NodeState
  ) {}

  public get grid(): number {
    return Math.floor(this.column / 3);
  }

  public get type(): NodeType {
    if (this.row === 0) {
      return NodeType.Hybrid;
    } else {
      return this.column % 3 === 1 ? NodeType.Cube : NodeType.Cone;
    }
  }
}