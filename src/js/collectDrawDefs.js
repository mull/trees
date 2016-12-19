// @flow
import type { Node } from './Tree'


export type DrawNodeDef = {
  nLeft:  number,
  nRight: number,
  left:   ?DrawNodeDef,
  right:  ?DrawNodeDef,
  width:  number,
  level:  number,
  node:   Node,
};



export default function collectDefs(node: Node, level: number = 0): DrawNodeDef {
  const drawDef: DrawNodeDef = {
    nLeft: 1,
    nRight: 1,
    left: null,
    right: null,
    width: 0,
    level: level,
    node,
  }
  
  if (node.left) {
    const leftOp = collectDefs(node.left, level + 1)
    drawDef.nLeft = 1 + leftOp.width;
    drawDef.left = leftOp
  }

  if (node.right) {
    const rightOp = collectDefs(node.right, level + 1)
    drawDef.nRight = 1 + rightOp.width;
    drawDef.right = rightOp
  }
  
  
  drawDef.width = drawDef.nLeft + drawDef.nRight;
  return drawDef;
}
