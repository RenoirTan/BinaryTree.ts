import Node, { valuesOfNodes } from "./node";

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

  static fromFlattened<T>(flattened: (T | undefined)[]): BinaryTree<T> {
    return fromFlattened(flattened);
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

  bfsNodes(): Generator<Node<T>> {
    return bfsNodesOf(this);
  }

  bfsValues(): Generator<T> {
    return bfsValuesOf(this);
  }

  toBfs(): T[] {
    return [...this.bfsValues()];
  }

  toFlattenedNodes(): (Node<T> | undefined)[] {
    return flattenedNodesOf(this);
  }

  toFlattened(): (T | undefined)[] {
    return flattenedValuesOf(this);
  }

  invert() {
    for (const node of this.bfsNodes()) {
      const left = node.left;
      const right = node.right;
      node.left = right;
      node.right = left;
    }
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

const preorderValuesOf = <T>(tree: BinaryTree<T>) => valuesOfNodes(preorderNodesOf(tree));

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

const inorderValuesOf = <T>(tree: BinaryTree<T>) => valuesOfNodes(inorderNodesOf(tree));

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

const postorderValuesOf = <T>(tree: BinaryTree<T>) => valuesOfNodes(postorderNodesOf(tree));

function* bfsNodesOf<T>(tree: BinaryTree<T>): Generator<Node<T>> {
  if (!tree.root)
    return;
  const bfs: Node<T>[] = [tree.root];
  while (bfs.length >= 1) {
    const node = bfs.splice(0, 1)[0];
    yield node;
    if (node.left) bfs.push(node.left);
    if (node.right) bfs.push(node.right);
  }
}

const bfsValuesOf = <T>(tree: BinaryTree<T>) => valuesOfNodes(bfsNodesOf(tree));

function flattenedNodesOf<T>(tree: BinaryTree<T>): (Node<T> | undefined)[] {
  if (!tree.root)
    return [];
  const bfs: {node: Node<T>, index: number}[] = [{ node: tree.root, index: 0 }];
  const flattened: (Node<T> | undefined)[] = [tree.root];
  function addLayer() {
    const length = flattened.length + 1;
    for (let i = 0; i < length; i++) {
      flattened.push(undefined);
    }
  }
  while (bfs.length >= 1) {
    const { node, index } = bfs.splice(0, 1)[0];
    if (node.left) {
      const leftNodeIndex = index * 2 + 1;
      if (leftNodeIndex >= flattened.length) addLayer();
      flattened[leftNodeIndex] = node.left;
      bfs.push({ node: node.left, index: leftNodeIndex });
    }
    if (node.right) {
      const rightNodeIndex = index * 2 + 2;
      if (rightNodeIndex >= flattened.length) addLayer();
      flattened[rightNodeIndex] = node.right;
      bfs.push({ node: node.right, index: rightNodeIndex });
    }
  }
  return flattened;
}

function flattenedValuesOf<T>(tree: BinaryTree<T>): (T | undefined)[] {
  return flattenedNodesOf(tree).map(node => (node) ? node.value : undefined);
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

export function fromFlattened<T>(flattened: (T | undefined)[]): BinaryTree<T> {
  if (!flattened)
    return new BinaryTree(undefined);
  const nodeArray = flattened.map(value => (value) ? new Node(value) : undefined);
  for (let i = 1; i < nodeArray.length; i++) { // skip root
    const node = nodeArray[i]
    if (!node) continue;
    const parentIndex = (i - 1) >> 1;
    const parent = nodeArray[parentIndex]!;
    if ((i & 1) === 1) {
      parent.left = node;
    } else {
      parent.right = node;
    }
  }
  return new BinaryTree(nodeArray[0]);
}