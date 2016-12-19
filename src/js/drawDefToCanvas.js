// @flow
import type Tree, { Node } from './Tree';
import type { DrawNodeDef } from './collectDrawDefs'

const NODE_RADIUS = 2
const LEVEL_Y_DISTANCE = 20
const NODE_WIDTH = 20
const NODE_HEIGHT = 20
const SAFETY_PADDING = 10

type Point = [number, number];

function widthToPx(width: number) {
  return (width * NODE_WIDTH) + SAFETY_PADDING
}

function drawCircle(to: Point, context: CanvasRenderingContext2D, fill = true) {
  context.beginPath()
  context.arc(to[0], to[1], NODE_RADIUS, 0, Math.PI * 2, true)
  if (fill) {
    context.fillStyle = '#000'
    context.fill()
  } else {
    context.strokeStyle = '#ddd'
    context.stroke()
  }
  context.closePath()
}

function connectPoints(context: CanvasRenderingContext2D, pointA: Point, pointB: Point) {
  context.beginPath()
  context.moveTo(...pointA)
  context.lineTo(...pointB)
  context.strokeStyle = '#eee'
  context.stroke()
  context.closePath()
}

function drawDef(def: ?DrawNodeDef, context: CanvasRenderingContext2D, to: Point) {
  if (!def) return;

  drawCircle(to, context, true)
  const [x, y] = to
  const nextY = y + LEVEL_Y_DISTANCE

  if (def.left) {
    const nextPoint = [x - widthToPx(def.left.nRight), nextY]
    connectPoints(context, to, nextPoint)
    drawDef(def.left, context, nextPoint)
    
  } else {
    const nextPoint = [x - NODE_WIDTH, nextY]
    connectPoints(context, nextPoint, to)
    drawCircle(nextPoint, context, false)
  }

  if (def.right) {
    const nextPoint = [x + widthToPx(def.right.nLeft), nextY]
    connectPoints(context, to, nextPoint)
    drawDef(def.right, context, nextPoint)
  } else {
    const nextPoint = [x + NODE_WIDTH, nextY]
    connectPoints(context, nextPoint, to)
    drawCircle(nextPoint, context, false)
  }
  
}

export default function drawDefToCanvas(root: DrawNodeDef, to: HTMLCanvasElement) {
  const context: ?CanvasRenderingContext2D = to.getContext('2d')

  if (!context) return;

  const xOffset = 0
  const startX = widthToPx(root.nLeft) + xOffset
  const treeWidth = xOffset + widthToPx(root.width) + NODE_WIDTH;
  context.lineWidth = 0.1
  to.width = treeWidth;
  drawDef(root, context, [startX, 20]);
}
