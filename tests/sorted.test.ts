import SortedTree from "../src/sortedtree";

test("sorted tree", () => {
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
  for (const node of tree.bfsNodes()) {
    if (node.left) {
      expect(node.left.value < node.value).toBeTruthy();
    }
    if (node.right) {
      expect(node.right.value >= node.value).toBeTruthy();
    }
  }
});