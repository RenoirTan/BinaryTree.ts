import Node from "./node";

export default class BinaryTree<T> {
  root?: Node<T>

  constructor(root?: Node<T>) {
    this.root = root;
  }

  preorderNodes(): Generator<Node<T>> {
    return preorderNodesOf(this);
  }

  preorderValues(): Generator<T> {
    return preorderValuesOf(this);
  }

  inorderNodes(): Generator<Node<T>> {
    return inorderNodesOf(this);
  }

  inorderValues(): Generator<T> {
    return inorderValuesOf(this);
  }

  postorderNodes(): Generator<Node<T>> {
    return postorderNodesOf(this);
  }

  postorderValues(): Generator<T> {
    return postorderValuesOf(this);
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