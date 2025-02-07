import SortedTree from "../src/sortedtree";

function generateSortedTree(): SortedTree<string> {
  const tree = new SortedTree<string>();
  tree.insert("E");
  tree.insert("C");
  tree.insert("G");
  tree.insert("B");
  tree.insert("D");
  tree.insert("A");
  tree.insert("F");
  tree.insert("H");
  tree.insert("I");
  return tree;
}

test("sorted tree", () => {
  const tree = generateSortedTree();
  for (const node of tree.bfsNodes()) {
    if (node.left) {
      expect(node.left.value < node.value).toBeTruthy();
    }
    if (node.right) {
      expect(node.right.value >= node.value).toBeTruthy();
    }
  }
});

test("search value", () => {
  const tree = generateSortedTree();
  const values = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
  for (const value of values) {
    expect(tree.searchValue(value)).toStrictEqual(value);
  }
  expect(tree.searchValue("Bruh")).toBeUndefined();
  expect(tree.searchValue("N")).toBeUndefined();
});