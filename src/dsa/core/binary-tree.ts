export class TreeNode {
  value: any;
  left: TreeNode;
  right: TreeNode;

  constructor (value: any) {
    this.value = value;
  };
};

export class BinaryTree {
  root: TreeNode;

  constructor (value?: any) {
    if(value !== undefined && value !== null) this.root = new TreeNode(value);
  };

  insert(value: any) {
    if(!this.root) {
      this.root = new TreeNode(value);
      return;
    };

    this._insertRecursive(value, this.root);
  };

  private _insertRecursive(value: any, node: TreeNode) {
    if(value <= node.value) {
      if(!node.left) {
        node.left = new TreeNode(value);
      } else this._insertRecursive(value, node.left);
    } else {
      if(!node.right) {
        node.right = new TreeNode(value);
      } else this._insertRecursive(value, node.right);
    };
  };

  search(value: any) {
    return this._searchRecursive(value, this.root);
  };

  private _searchRecursive(value: any, node: TreeNode): any {
    if(!node) return null;
    if(value === node.value) return node;
    if(value <= node.value) {
      return this._searchRecursive(value, node.left);
    } else {
      return this._searchRecursive(value, node.right);
    };
  };

  dfsSearch(value: any, node: TreeNode = this.root): TreeNode {
    return this._dfsSearchRecursive(value, node) || null;
  };

  private _dfsSearchRecursive(value: any, node: TreeNode): TreeNode {
    if(!node) return null;
    if(node.value === value) return node;
    if(this._dfsSearchRecursive(value, node.left)) return node.left;
    if(this._dfsSearchRecursive(value, node.right)) return node.right;
  }; 

  bfsSearch(value: any, node: TreeNode = this.root): TreeNode {
    const queue: TreeNode[] = [node];
    while (queue.length) {
      const crrNode = queue.shift();
      if(crrNode.value === value) return crrNode;
      if(crrNode.left) queue.push(crrNode.left);
      if(crrNode.right) queue.push(crrNode.right);
    };
    return null;
  };

  preorderTraversal(node: TreeNode = this.root): any[] {
    const result: any[] = [];
    this._preorderTraversalRecursive(node, result);
    return result;
  };

  private _preorderTraversalRecursive(node: TreeNode, result: any[]): any {
    if(!node) return null;
    result.push(node.value);
    this._preorderTraversalRecursive(node.left, result);
    this._preorderTraversalRecursive(node.right, result);
  };

  inorderTraversal(node: TreeNode = this.root): any[] {
    const result: any[] = [];
    this._inorderTraversalRecursive(node, result);
    return result;
  };

  private _inorderTraversalRecursive(node: TreeNode, result: any[]): any {
    if(!node) return null;
    this._inorderTraversalRecursive(node.left, result);
    result.push(node.value);
    this._inorderTraversalRecursive(node.right, result);
  };

  postorderTraversal(node: TreeNode = this.root): any[] {
    const result: any[] = [];
    this._postorderTraversalRecursive(node, result);
    return result;
  };

  private _postorderTraversalRecursive(node: TreeNode, result: any[]): any {
    if(!node) return null;
    this._postorderTraversalRecursive(node.left, result);
    this._postorderTraversalRecursive(node.right, result);
    result.push(node.value);
  };

  static buildTree(inorder: any[], postorder: any[]): TreeNode {
    if(!inorder?.length || !postorder?.length) return null;
    const node = new TreeNode(postorder.pop());
    node.right = this.buildTree(inorder.slice(inorder.indexOf(node.value) + 1, inorder.length), postorder);
    node.left = this.buildTree(inorder.slice(0, inorder.indexOf(node.value)), postorder);
    return node;
  };

  print(node: TreeNode = this.root!, prefix: string = "", isLeft: boolean = true) {
    if (!node) return;
    if (node.right) this.print(node.right, prefix + (isLeft ? "│   " : "    "), false);
    console.log(prefix + (isLeft ? "└── " : "┌── ") + node.value);
    if (node.left) this.print(node.left, prefix + (isLeft ? "    " : "│   "), true);
  };

  static print(node: TreeNode, prefix: string = "", isLeft: boolean = true) {
    if (!node) return;
    if (node.right) this.print(node.right, prefix + (isLeft ? "│   " : "    "), false);
    console.log(prefix + (isLeft ? "└── " : "┌── ") + node.value);
    if (node.left) this.print(node.left, prefix + (isLeft ? "    " : "│   "), true);
  };

  // leet code 
  
  hasPathSum(value: any, node: TreeNode = this.root): boolean {
    return this._hasPathSumRecursive(value, node, []) || false;
  };

  private _hasPathSumRecursive(value: any, node: TreeNode, prevValues: any[]): boolean {
    if(!node) return false;
    if([ ...prevValues, node.value ].reduce((prev, crr) => prev + crr, 0) === value) return true;
    if(this._hasPathSumRecursive(value, node.left, [ ...prevValues, node.value ])) return true;
    if(this._hasPathSumRecursive(value, node.right, [ ...prevValues, node.value ])) return true;
  }; 

  levelOrderTraversal(node: TreeNode = this.root): any[][] {
    const queue: TreeNode[] = [node];
    const nodes: any[][] = [[node.value]];
    while (queue.length) {
      const crrNode = queue.shift();
      const sides: any[] = [];
      if(crrNode.left) {
        queue.push(crrNode.left);
        sides.push(crrNode.left.value);
      };
      if(crrNode.right) {
        queue.push(crrNode.right);
        sides.push(crrNode.right.value);
      };
      if(sides.length) nodes.push(sides);
    };
    return nodes;
  };

  static isSameTree(node1: TreeNode, node2: TreeNode): boolean {
    const queue: { node1: TreeNode, node2: TreeNode }[] = [{ node1, node2 }];

    while (queue.length) {
      const crrNodes = queue.shift();
      if(crrNodes.node1.value !== crrNodes.node2.value) return false;

      if(crrNodes.node1.left && !crrNodes.node2.left) return false;
      if(!crrNodes.node1.left && crrNodes.node2.left) return false;
      if(crrNodes.node1.right && !crrNodes.node2.right) return false;
      if(!crrNodes.node1.right && crrNodes.node2.right) return false;

      if(crrNodes.node1.left && crrNodes.node2.left) queue.push({ node1: crrNodes.node1.left, node2: crrNodes.node2.left });
      if(crrNodes.node1.right && crrNodes.node2.right) queue.push({ node1: crrNodes.node1.right, node2: crrNodes.node2.right });
    };

    return true;
  };

  maximumDepth(node: TreeNode = this.root) {
    let depths: number[] = [0];
    this._maximumDepthRecursive(node, depths, 0);
    return Math.max(...depths);
  };

  private _maximumDepthRecursive(node: TreeNode, depths: number[], depth: number) {
    if(!node) return;
    depth += 1;
    if(!node.left && !node.right) depths.push(depth);
    this._maximumDepthRecursive(node.left, depths, depth);
    this._maximumDepthRecursive(node.right, depths, depth);
  };

};

const tree = new BinaryTree(5);
tree.insert(10);
tree.insert(3);
tree.insert(7);

tree.print();
console.log(tree.maximumDepth());