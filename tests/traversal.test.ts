import { makeTreeWikipedia } from "./utils";

test("preorder test wikipedia", () => {
  expect([...makeTreeWikipedia().preorderValues()])
    .toStrictEqual(["F", "B", "A", "D", "C", "E", "G", "I", "H"]);
});

test("inorder test wikipedia", () => {
  expect([...makeTreeWikipedia().inorderValues()])
    .toStrictEqual(["A", "B", "C", "D", "E", "F", "G", "H", "I"]);
});