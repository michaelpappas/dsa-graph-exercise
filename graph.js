/** Node class for graph. */

class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}


/** Graph class. */

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  /** add Node instance and add it to nodes property on graph. */
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  /** add array of new Node instances and adds to them to nodes property. */
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.addVertex(vertex);
    }
  }

  /** add edge between vertices v1,v2 */
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  /** remove edge between vertices v1,v2 */
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  /** remove vertex from graph:
   *
   * - remove it from nodes property of graph
   * - update any adjacency lists using that vertex
   */
  removeVertex(vertex) {
    for (let neighbor of vertex.adjacent) {
      this.removeEdge(vertex, neighbor);
    }
    this.nodes.delete(vertex);
  }

  /** traverse graph with DFS and returns array of Node values */
  depthFirstSearch(start) {
    let toVisitStack = [start]; //[b]
    let seen = new Set(toVisitStack); //[a, b]
    let nodes = [];//[a,b,d,c]

    while (toVisitStack.length > 0) {
      const current = toVisitStack.pop();
      nodes.push(current.value);
      for (let neighbor of current.adjacent) {
        if (!seen.has(neighbor)) {
          toVisitStack.push(neighbor);
          seen.add(neighbor);
        }
      }
    }
    return nodes;

  }

  /** traverse graph with BFS and returns array of Node values */
  breadthFirstSearch(start) {
    let toVisitQueue = [start];
    let seen = new Set(toVisitQueue);
    // let nodes = [];

    while (toVisitQueue.length) {
      const current = toVisitQueue.shift();
      // nodes.push(current.value);

      for (let neighbour of current.adjacent) {
        if (!seen.has(neighbour)) {
          toVisitQueue.push(neighbour);
          seen.add(neighbour);
        }
      }
    }

    // console.log('seen', Array.from(seen).map(val => val.value));
    // console.log('nodes', nodes);
    // return nodes;
    return Array.from(seen).map(node => node.value);
  }

  /** find the distance of the shortest path from the start vertex to the end vertex */
  distanceOfShortestPath(start, end) {
    let toVisitQueue = [[start, 0]];
    let seen = new Set(toVisitQueue);

    while (toVisitQueue.length) {
      const [current, depth] = toVisitQueue.shift(); // e.g. [start, 0]

      if (current === end) return depth; // distance to node up til now i.e. depth

      for (let neighbour of current.adjacent) {
        if (!seen.has(neighbour)) {
          toVisitQueue.push([neighbour, depth + 1]);
          seen.add(neighbour);
        }
      }
    }
  }

  /** find the distance of the shortest path from the start vertex to the end vertex */
  // Recursive DFS just for practice:
  // distanceOfShortestPath(start, end, seen = new Set([start])) {
  //   // base cases:
  //   if (start === end) return 0;

  //   const pathsExhausted = Array.from(start.adjacent)
  //     .map(neighbour => seen.has(neighbour))
  //     .every(seenNeighbour => seenNeighbour === true);
  //   if (pathsExhausted) return undefined;

  //   let minDist = Infinity;

  //   for (let neighbour of start.adjacent) {
  //     if (!seen.has(neighbour)) {
  //       seen.add(neighbour);

  //       const neighbourMinDist = this.distanceOfShortestPath(
  //         neighbour,
  //         end,
  //         new Set([...seen])
  //       );

  //       const distCandidates = [minDist];
  //       if (neighbourMinDist !== undefined) distCandidates.push(neighbourMinDist + 1);

  //       minDist = Math.min(...distCandidates);
  //     }
  //   }

  //   return (minDist !== Infinity) ? minDist : undefined;
  // }
}

module.exports = { Graph, Node };
