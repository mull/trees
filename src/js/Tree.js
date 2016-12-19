// @flow


export class Node {
  value: number
  size: number
  height: number
  left: ?Node
  right: ?Node
  parent: ?Node

  constructor(value: number, parent: ?Node) {
    this.value = value
    this.size = 1
    this.parent = parent
  }

  add(value: number): void {
    if (this.value === value) return

    if (this.value > value) {
      if (!this.left) {
        this.left = new Node(value, this)
      } else {
        this.left.add(value)
      }
    } else {
      if (!this.right) {
        this.right = new Node(value, this)
      } else {
        this.right.add(value)
      }
    }

    this.size = 
      (this.left ? this.left.size : 0) +
      (this.right ? this.right.size : 0) + 
      1
  }
}

export default class Tree {
  size: number
  root: ?Node

  get size(): number {
    return this.root ? this.root.size : 0
  }

  add(num: number) {
    if (!this.root) {
      this.root = new Node(num)
    } else {
      this.root.add(num)
    }
  }

  clear(): void {
    this.root = null
  }
}

