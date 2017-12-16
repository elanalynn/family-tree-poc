import * as data from './family.json';
import css from './app.scss';

console.log(data);

const boxWidth = 180;
const boxHeight = 50;

var zoom = d3.behavior
  .zoom()
  .scaleExtent([.1,1])
  .on('zoom', () => {
    svg.attr('transform', `translate(${d3.event.translate}) scale(${d3.event.scale})`);
  })
  .translate([150, 200]);

const svg = d3.select('body').append('svg')
  .attr('width', 1400)
  .attr('height', 1000)
  .call(zoom)
  .append('g')
  .attr('transform', 'translate(150,300)');

const tree = d3.layout
  .tree()
  .nodeSize([100, 200])
  .separation(() => .5)
  .children(p => p._parents);

const nodes = tree.nodes(data);
const links = tree.links(nodes);

svg
  .selectAll('path.link')
  .data(links)
  .enter().append('path')
  .attr('class', 'link')
  .attr('d', elbow);
 
const node = svg
  .selectAll('g.person')
  .data(nodes)
  .enter().append('g')
  .attr('class', 'person')
  .attr('transform', (d) => `translate(${d.y},${d.x})`);

node.append('rect')
  .attr({
    x: -(boxWidth/2),
    y: -(boxHeight/2),
    width: boxWidth,
    height: boxHeight
  });

node.append('text')
  .attr('dx', -(boxWidth/2) + 10)
  .attr('dy', 0)
  .attr('text-anchor', 'start')
  .attr('class', 'name')
  .text((d) =>  d.name);

function elbow(d) {
  return 'M' + d.source.y + ',' + d.source.x
  + 'H' + (d.source.y + (d.target.y-d.source.y)/2)
  + 'V' + d.target.x 
  + 'H' + d.target.y;
}