import BinaryTree from "../src/binarytree";
import Node from "../src/node";

function makeTree(): BinaryTree<string> {
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

describe("preorder test 0", () => {
  expect([...makeTree().preorderValues()])
    .toBe(["F", "B", "A", "D", "C", "E", "G", "I", "H"]);
});