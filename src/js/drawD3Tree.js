// @flow
const { d3 } = window
import type { Node } from './Tree'
import type { DrawNodeDef } from './collectDrawDefs'


class Point {
  x: number
  y: number

  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

class Entry {
  point: Point
  from: ?Point
  value: number

  constructor(point, from, node, def) {
    this.point = point
    this.from = from
    this.value = node.value
  }
}

type CalcResult = {
  minX: number,
  maxX: number,
  minY: number,
  maxY: number,
  points: Array<Entry>,
};

const LEVEL_Y_SPACE = 80
const NODE_WIDTH = 18
const NODE_RADIUS = 4
const Y_OFFSET = 8


function calc(def: DrawNodeDef): CalcResult {
  const startX = def.nLeft * NODE_WIDTH
  const result = {
    points: [],
    minX: startX,
    maxX: startX,
    minY: 0,
    maxY: 0,
  }

  function iterate(def: DrawNodeDef, atX: number, from: ?Point) {
    const y = LEVEL_Y_SPACE * def.level
    result.minY = Math.min(result.minY, y)
    result.maxY = Math.max(result.maxY, y)
    result.minX = Math.min(result.minX, atX)
    result.maxX = Math.max(result.maxX, atX)

    //if (def.node.value === 1 || def.node.value === 80) debugger;
    const p = new Point(atX, y, def.node)
    const entry = new Entry(p, from, def.node, def)
    result.points.push(entry)

    if (def.left) iterate(def.left, atX - (def.left.nRight * NODE_WIDTH), p)
    if (def.right) iterate(def.right, atX + (def.right.nLeft * NODE_WIDTH), p)

    return result;  
  }
  
  iterate(def, 0, null)
  return result;
}

export default function drawTree(root: DrawNodeDef, to: Element) {
  const result: CalcResult = calc(root)
  console.log(result);
  const totalWidth = Math.abs(result.minX) + result.maxX + (NODE_RADIUS * 2)
  const xModifier = Math.abs(result.minX) + NODE_RADIUS;
  const svg = d3
    .select(to)
    .attr('width', totalWidth)
    .attr('height', 800)
    .append('g')

  const tip = d3.tip()
    .attr('class', 'd3-tip')
    .html((d: Entry) => '<pre>' + JSON.stringify({
      value: d.value, 
      x: d.point.x, 
      y: d.point.y, 
    }, null, 2) + '</pre>')
    .offset([0, 12])
    .direction('e')

  svg.call(tip)

  const lines = svg
    .selectAll('line')  
    .data(result.points)
    .enter()
    .append('line')
    .style('stroke', '#eee')
    .filter(d => !!d.from)
    .attr('x1', (d: Entry) => d.from.x + xModifier)
    .attr('x2', (d: Entry) => d.point.x + xModifier)
    .attr('y1', (d: Entry) => d.from.y + Y_OFFSET)
    .attr('y2', (d: Entry) => d.point.y + Y_OFFSET)

  const circles = svg
    .selectAll('circle')
    .data(result.points)
    .enter()
    .append('circle')
    .attr('class', 'circle')
    .attr('cx', (d: Entry) => d.point.x + xModifier)
    .attr('cy', (d: Entry) => d.point.y + Y_OFFSET)
    .attr('r', NODE_RADIUS)
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)


}


