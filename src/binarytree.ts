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
}

function* preorderNodesOf<T>(tree: BinaryTree<T>): Generator<Node<T>> {
  if (!tree.root)
    return;
  const dfs: Node<T>[] = [tree.root];
  while (dfs.length >= 1) {
    const node = dfs.splice(0, 1)[0];
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