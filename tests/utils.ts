import BinaryTree from "../src/binarytree";
import Node from "../src/node";

export function makeTreeWikipedia(): BinaryTree<string> {
  const root = new Node("F");
  root.left = new Node("B");
  root.left.left = new Node("A");
  root.left.right = new Node("D");
  root.left.right.left = new Node("C");
  root.left.right.right = new Node("E");
  root.right = new Node("G");
  root.right.right = new Node("I");
  root.right.right.left = new Node("H");
  return new BinaryTree(root);
}


export const wikiTree = {
  tree: makeTreeWikipedia(),
  preorder: ["F", "B", "A", "D", "C", "E", "G", "I", "H"],
  inorder: ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
  postorder: ["A", "C", "E", "D", "B", "H", "I", "G", "F"],
  bfs: ["F", "B", "G", "A", "D", "I", "C", "E", "H"]
};