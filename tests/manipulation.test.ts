import { makeTreeWikipedia } from "./utils";

test("invert tree wikipedia", () => {
  const tree = makeTreeWikipedia();
  tree.invert();
  expect(tree.toPreorder()).toStrictEqual(["F", "G", "I", "H", "B", "D", "E", "C", "A"]);
});