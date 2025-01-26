import Node from "./node";

export default class BinaryTree<T> {
  root?: Node<T>

  constructor(root?: Node<T>) {
    this.root = root;
  }
}