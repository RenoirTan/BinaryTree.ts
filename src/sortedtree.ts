import BinaryTree from "./binarytree";
import Node from "./node";

type Compare<T> = (a: T, b: T) => number;

export default class SortedTree<T> extends BinaryTree<T> {
  compare: Compare<T>;

  constructor(compare?: Compare<T>, root?: Node<T>) {
    super(root);
    this.compare = compare ?? ((a: any, b: any) => (a < b) ? -1 : ((a > b) ? 1 : 0));
  }

  insert(value: T) {
    if (!this.root) {
      this.root = new Node(value);
    } else {
      insertInTree(this.root, value, this.compare);
    }
  }
}

function insertInTree<T>(node: Node<T>, value: T, compare: Compare<T>) {
  const rocket = compare(value, node.value);
  if (rocket < 0) {
    if (node.left) {
      insertInTree(node.left, value, compare);
    } else {
      node.left = new Node(value);
    }
  } else {
    if (node.right) {
      insertInTree(node.right, value, compare);
    } else {
      node.right = new Node(value);
    }
  }
}