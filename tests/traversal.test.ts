import { wikiTree } from "./utils";

test("preorder test wikipedia", () => {
  expect(wikiTree.tree.toPreorder()).toStrictEqual(wikiTree.preorder);
});

test("inorder test wikipedia", () => {
  expect(wikiTree.tree.toInorder()).toStrictEqual(wikiTree.inorder);
});

test("postorder test wikipedia", () => {
  expect(wikiTree.tree.toPostorder()).toStrictEqual(wikiTree.postorder);
});

test("bfs test wikipedia", () => {
  expect(wikiTree.tree.toBfs()).toStrictEqual(wikiTree.bfs);
});