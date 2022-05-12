/**
 * 
 * @param grid
 * @param startNode
 * @param endNode
 * @returns Object with 3 properties
 *          visitedNodes: Expanded nodes ordered from the first to the last 
 *          pathNodes: Nodes in the resulted path
 *          duration: Time taken in miliseconds
 */
 export function aStarSearch(grid, startNode, endNode) {
  let activeGrid = generateGrid(grid);
  if (startNode.x === endNode.x && startNode.y === endNode.y) {
    return false;
  }

  let sortedQueue = [];
  let visitedNodes = [];
  let pathNodes = [];
  let startTime = performance.now();

  let result = {
    visitedNodes: visitedNodes,
    pathNodes: pathNodes,
    duration: 0,
    }

  let startActiveNode = activeGrid[startNode.x][startNode.y];
  startActiveNode.costFromStart = 0;
  startActiveNode.heuristic = getManhattanDistance(startNode, endNode);
  sortedQueue.push(startActiveNode);

  while (sortedQueue.length !== 0) {
    sortedQueue.sort((a, b) => a.heuristic - b.heuristic);
    let nearestNode = sortedQueue.shift();
    nearestNode.isVisited = true;
    visitedNodes.push(nearestNode);

    if (nearestNode.x === endNode.x && 
        nearestNode.y === endNode.y) {
      result.pathNodes = getPathNodes(activeGrid, endNode);
      result.duration = performance.now() - startTime;
        console.log(result);
      return result;
    }

    let neighbours = getNeighbours(nearestNode, activeGrid);
    for (let neighbour of neighbours) {
      let cost = nearestNode.costFromStart + 1;

      if (nodeNotInQueue(neighbour, sortedQueue)) {
        neighbour.costFromStart = cost;
        neighbour.heuristic = cost + getManhattanDistance(neighbour, endNode);
        neighbour.previousNode = nearestNode;
        sortedQueue.unshift(neighbour);
      } else if (cost < neighbour.costFromStart) {
        neighbour.costFromStart = cost;
        neighbour.heuristic = cost + getManhattanDistance(neighbour, endNode);
        neighbour.previousNode = nearestNode;
      }
    }
  }

  result.duration = performance.now() - startTime;
  return result;
}

/**
 * Generates a more relevant grid
 * @param grid 
 * @returns A new grid containing nodes with added relevant properties
 */
function generateGrid(grid) {
  return grid.map((data) => (data.map((node) => {
    let newNode = 
    {
      ...node, 
      previousNode: null, 
      heuristic: Number.MAX_SAFE_INTEGER,
      costFromStart: Number.MAX_SAFE_INTEGER,
    }; 
    return newNode;
  })))
}

/**
 * Evaluates manhattan distance between two nodes in a grid
 */
function getManhattanDistance(sourceNode, endNode) {
  return Math.abs(sourceNode.x - endNode.x) + Math.abs(sourceNode.y - endNode.y);
}

/**
 * Gets legal neighbours
 * @param node 
 * @param grid 
 * @returns Neighbor nodes that is not a wall nor a visited node
 */
function getNeighbours(node, grid) {
  let neighbours = [];
  let { x, y } = node;

  x = parseInt(x);
  y = parseInt(y);

  if (x > 0) neighbours.push(grid[x - 1][y]);
  if (y < grid[0].length - 1) neighbours.push(grid[x][y + 1]);
  if (x < grid.length - 1) neighbours.push(grid[x + 1][y]);
  if (y > 0) neighbours.push(grid[x][y - 1]);

  return neighbours.filter((neighbour) => !neighbour.isWall && !neighbour.isVisited);
}

/**
 * 
 * @param node 
 * @param queue 
 * @returns Whether a node is not in a queue
 */
function nodeNotInQueue(node, queue) {
  for (let queueNode of queue) {
    if (queueNode.x === node.x && queueNode.y === node.y) {
      return false;
    }
  }
  return true;
}

function getPathNodes(grid, endNode) {
  let pathNodes = [];
  let currNode = grid[endNode.x][endNode.y];
  while (currNode !== null) {
    pathNodes.unshift(currNode);
    currNode = currNode.previousNode;
  }
  return pathNodes;
}