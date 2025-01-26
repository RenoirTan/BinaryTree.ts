import Node from "./node";

export default class BinaryTree<T> {
  root?: Node<T>

  constructor(root?: Node<T>) {
    this.root = root;
  }

  static fromPreAndInorder<T>(preorder: T[], inorder: T[]): BinaryTree<T> {
    return fromPreAndInorder(preorder, inorder);
  }

  static fromPostAndInorder<T>(postorder: T[], inorder: T[]): BinaryTree<T> {
    return fromPostAndInorder(postorder, inorder);
  }

  preorderNodes(): Generator<Node<T>> {
    return preorderNodesOf(this);
  }

  preorderValues(): Generator<T> {
    return preorderValuesOf(this);
  }

  toPreorder(): T[] {
    return [...this.preorderValues()];
  }

  inorderNodes(): Generator<Node<T>> {
    return inorderNodesOf(this);
  }

  inorderValues(): Generator<T> {
    return inorderValuesOf(this);
  }

  toInorder(): T[] {
    return [...this.inorderValues()];
  }

  postorderNodes(): Generator<Node<T>> {
    return postorderNodesOf(this);
  }

  postorderValues(): Generator<T> {
    return postorderValuesOf(this);
  }

  toPostorder(): T[] {
    return [...this.postorderValues()];
  }
}

function* preorderNodesOf<T>(tree: BinaryTree<T>): Generator<Node<T>> {
  if (!tree.root)
    return;
  const dfs: Node<T>[] = [tree.root];
  while (dfs.length >= 1) {
    const node = dfs.pop()!;
    yield node;
    if (node.right) dfs.push(node.right);
    if (node.left) dfs.push(node.left);
  }
}

function* preorderValuesOf<T>(tree: BinaryTree<T>): Generator<T> {
  for (const node of preorderNodesOf(tree)) {
    yield node.value;
  }
}

function* inorderNodesOf<T>(tree: BinaryTree<T>): Generator<Node<T>> {
  if (!tree.root)
    return;
  const dfs: Node<T>[] = [];
  function stackLefts(node?: Node<T>) {
    while (node) {
      dfs.push(node);
      node = node.left;
    }
  }
  stackLefts(tree.root);
  while (dfs.length >= 1) {
    const node = dfs.pop()!;
    yield node;
    if (node.right) {
      stackLefts(node.right);
    }
  }
}

function* inorderValuesOf<T>(tree: BinaryTree<T>): Generator<T> {
  for (const node of inorderNodesOf(tree)) {
    yield node.value;
  }
}

function* postorderNodesOf<T>(tree: BinaryTree<T>): Generator<Node<T>> {
  if (!tree.root)
    return;
  const dfs: Node<T>[] = [];
  function pathToLeftmostLeaf(node?: Node<T>) {
    while (node) {
      dfs.push(node);
      if (node.left)
        node = node.left;
      else
        node = node.right;
    }
  }
  pathToLeftmostLeaf(tree.root);
  while (dfs.length >= 1) {
    const node = dfs.pop()!;
    yield node;
    if (dfs.length >= 1) {
      const parent = dfs[dfs.length - 1];
      if (node === parent.left) {
        pathToLeftmostLeaf(parent.right);
      }
    }
  }
}

function* postorderValuesOf<T>(tree: BinaryTree<T>): Generator<T> {
  for (const node of postorderNodesOf(tree)) {
    yield node.value;
  }
}

function inorderValuesToIndices<T>(inorder: T[]): Map<T, number> {
  const map = new Map<T, number>();
  for (let i = 0; i < inorder.length; i++) {
    map.set(inorder[i], i);
  }
  return map;
}

export function fromPreAndInorder<T>(preorder: T[], inorder: T[]): BinaryTree<T> {
  const iv2i = inorderValuesToIndices(inorder);

  function inner(pidx: number, start: number, end: number): Node<T> | undefined {
    if (start > end)
      return undefined;
    const value = preorder[pidx];
    if (start == end)
      return new Node(value);
    const iidx = iv2i.get(value)!;
    const left = inner(pidx+1, start, iidx-1);
    const leftSize = iidx - start;
    const right = inner(pidx+leftSize+1, iidx+1, end);
    return new Node(value, left, right);
  }

  return new BinaryTree(inner(0, 0, preorder.length - 1));
}

export function fromPostAndInorder<T>(postorder: T[], inorder: T[]): BinaryTree<T> {
  const iv2i = inorderValuesToIndices(inorder);

  function inner(pidx: number, start: number, end: number): Node<T> | undefined {
    if (start > end)
      return undefined;
    const value = postorder[pidx];
    if (start == end)
      return (value) ? new Node(value) : undefined;
    const iidx = iv2i.get(value)!;
    const right = inner(pidx-1, iidx+1, end);
    const rightSize = end - iidx;
    const left = inner(pidx-rightSize-1, start, iidx-1);
    return new Node(value, left, right);
  }

  return new BinaryTree(inner(postorder.length - 1, 0, postorder.length - 1));
}