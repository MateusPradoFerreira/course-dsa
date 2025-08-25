export type GraphDependence = [number, number];

function canFinish(dependences: GraphDependence[], courses: number): boolean {
  const graph: Record<number, number[]> = {};
  for(let [node1, node2] of dependences) graph[node1] = graph[node1]? [ ...graph[node1], node2 ] : [node2];

  const state: number[] = Array.from({ length: courses }, (_, i) => i + 1).map(() => 0);
  function hasCycle(course: number): boolean {
    if(state[course] === 1) return true;
    if(state[course] === 2) return false;

    state[course] = 1;
    console.log(graph)
    console.log(course)
    for(let neightbor of graph[course]) {
      if(hasCycle(neightbor)) return true;
    };
    state[course] = 2;
    return false;
  };

  for(let index of Array.from({ length: courses }, (_, i) => i + 1)) {
    if(hasCycle(index as number)) return false; 
  };

  return true;
};

const dependences: GraphDependence[] = [[1, 0], [0, 1]];
console.log(canFinish(dependences, 1));