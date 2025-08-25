export type Graph = Record<string, Record<string, number>>;
export type GraphNodeList = [string, string, number][];
export type GraphShortPaths = Record<string, {
  distance: number;
  previus: string;
}>;

export function nodeListToGraph(nodes: GraphNodeList): Graph {
  const graph: Graph = {};

  for (let node of nodes) {
    if(!graph[node[0]]) {
      graph[node[0]] = { [node[1]]: node[2] };
      continue;
    };
    graph[node[0]][node[1]] = node[2];
  };

  return graph;
};

export function getShortPaths(graph: Graph, start: string): GraphShortPaths {
  const openedVertices: string[] = Object.keys(graph);
  const visitedVertices: string[] = [];

  const paths: GraphShortPaths = {
    [openedVertices[0]]: {
      distance: 0,
      previus: null,
    },
  };

  while (openedVertices.length) {
    const currentVertice = openedVertices.shift();

    console.log(currentVertice);
    for (let [neighbor, distance] of Object.entries(graph[currentVertice])) {
      if(visitedVertices.includes(neighbor)) continue;
      const distanceSum = paths[currentVertice]? paths[currentVertice].distance + distance : distance;
      console.log("-", neighbor, "cd", distance, "rd", paths[currentVertice].distance, "sd", distanceSum);
      if(!paths[neighbor] || paths[neighbor].distance > distanceSum) paths[neighbor] = {
        distance: distanceSum,
        previus: currentVertice === start? null : currentVertice,
      };
      console.log("-", paths[neighbor]);
    };

    visitedVertices.push(currentVertice);
  };

  return paths;
};