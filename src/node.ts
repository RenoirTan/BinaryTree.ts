export default class Node<T> {
  value: T
  left?: Node<T>
  right?: Node<T>

  constructor(value: T, left?: Node<T>, right?: Node<T>) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

export function* valuesOfNodes<T>(nodes: Iterable<Node<T>>): Generator<T> {
  for (const node of nodes) {
    yield node.value;
  }
}