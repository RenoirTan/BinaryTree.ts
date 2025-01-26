import BinaryTree from "../src/binarytree";
import { wikiTree } from "./utils";

test("creation from preorder and inorder wikipedia", () => {
  const generated = BinaryTree.fromPreAndInorder(wikiTree.preorder, wikiTree.inorder);
  expect(generated.toPreorder()).toStrictEqual(wikiTree.preorder);
  expect(generated.toInorder()).toStrictEqual(wikiTree.inorder);
  expect(generated.toPostorder()).toStrictEqual(wikiTree.postorder);
});