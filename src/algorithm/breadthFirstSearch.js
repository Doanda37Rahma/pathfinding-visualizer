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
export function breadthFirstSearch(grid, startNode, endNode) {
  let activeGrid = generateGrid(grid);
  if (startNode.x === endNode.x && startNode.y === endNode.y) {
    return false;
  }

  let queue = [];
  let visitedNodes = [];
  let pathNodes = [];
  let startTime = performance.now();

  let result = {
    visitedNodes: visitedNodes,
    pathNodes: pathNodes,
    duration: 0,
  }

  queue.push(activeGrid[startNode.x][startNode.y]);

  while (queue.length !== 0) {
    let nearestNode = queue.shift();
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
      neighbour.previousNode = nearestNode;
      if (nodeNotInQueue(neighbour, queue)) {
        queue.push(neighbour);
      }
    }
  }

  result.duration = performance.now() - startTime;
  return result;
}

function generateGrid(grid) {
  return grid.map((data) => (data.map((node) => {
    let newNode = {...node, previousNode: null}; 
    return newNode;
  })))
}

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