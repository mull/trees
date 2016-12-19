// @flow
import collectDefs from './collectDrawDefs'
import drawD3Tree from './drawD3Tree'
import drawDefToCanvas from './drawDefToCanvas'
import Tree from './Tree'


const tree = new Tree()

function randomTree() {
  tree.clear()
  for (let i = 0; i < 22; i++) {
    const num = Math.floor(Math.random() * 500) + 1
    tree.add(num)
  }
}

function balancedTree() {
  tree.clear()
  tree.add(12)
  tree.add(18)
  tree.add(24)
  tree.add(6)
  tree.add(1)
  tree.add(8)
  tree.add(21)
}

let renderType = "d3"


function render() {
  if (tree.root) {
    const root = collectDefs(tree.root)

    switch (renderType) {
      case "d3":
        const svg = document.getElementById('svg')
        if (svg) drawD3Tree(root, svg) 
        break;
    }
  }
}


//randomTree()
balancedTree()
render()