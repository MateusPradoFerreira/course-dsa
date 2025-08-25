import { Graph, GraphNodeList, nodeListToGraph } from "./graph-dijkstra";

function networkDelayTime(graph: Graph, node: string, signal: number) {
  // implementation with queue

  const distances: Record<string, number> = {
    [node]: 0,
  };

  const queue: [string, number][] = [[node, 0]];

  while (queue.length) {
    const [crrNode, crrDistance] = queue.shift(); 

    const crrGraphNode = graph[crrNode];
    if(crrGraphNode) {
      for(let [neighbor, distance] of Object.entries(crrGraphNode)) {
        const crrRegisteredDistance = distances[neighbor] || Infinity;
        if(crrDistance + distance < crrRegisteredDistance) {
          distances[neighbor] = crrDistance + distance;
          queue.push([neighbor, crrDistance + distance]);
        };
      };
    };
  };

  let max = -1;
  if(Object.values(distances).reduce((prev, crr) => prev + crr, 0) < signal) return max;
  for(let distance of Object.values(distances)) max = Math.max(max, distance);
  return max || -1;
};

const nodes: GraphNodeList = [["2", "1", 1], ["2", "3", 1], ["3", "4", 1]];
const graph: Graph = nodeListToGraph(nodes);

console.log(networkDelayTime(graph, "2", 4));