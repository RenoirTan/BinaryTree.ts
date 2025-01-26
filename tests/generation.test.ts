import BinaryTree from "../src/binarytree";
import { wikiTree } from "./utils";

test("creation from preorder and inorder wikipedia", () => {
  const generated = BinaryTree.fromPreAndInorder(wikiTree.preorder, wikiTree.inorder);
  expect(generated.toPreorder()).toStrictEqual(wikiTree.preorder);
  expect(generated.toInorder()).toStrictEqual(wikiTree.inorder);
  expect(generated.toPostorder()).toStrictEqual(wikiTree.postorder);
});

test("creation from postorder and inorder wikipedia", () => {
  const generated = BinaryTree.fromPostAndInorder(wikiTree.postorder, wikiTree.inorder);
  expect(generated.toPreorder()).toStrictEqual(wikiTree.preorder);
  expect(generated.toInorder()).toStrictEqual(wikiTree.inorder);
  expect(generated.toPostorder()).toStrictEqual(wikiTree.postorder);
});

test("creation from flattened wikipedia", () => {
  const generated = BinaryTree.fromFlattened(wikiTree.flattened);
  expect(generated.toFlattened()).toStrictEqual(wikiTree.flattened);
});