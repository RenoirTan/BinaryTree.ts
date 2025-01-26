import { makeTreeWikipedia } from "./utils";

const wikiTree = makeTreeWikipedia();

test("preorder test wikipedia", () => {
  expect(wikiTree.toPreorder()).toStrictEqual(["F", "B", "A", "D", "C", "E", "G", "I", "H"]);
});

test("inorder test wikipedia", () => {
  expect(wikiTree.toInorder()).toStrictEqual(["A", "B", "C", "D", "E", "F", "G", "H", "I"]);
});

test("postorder test wikipedia", () => {
  expect(wikiTree.toPostorder()).toStrictEqual(["A", "C", "E", "D", "B", "H", "I", "G", "F"]);
});