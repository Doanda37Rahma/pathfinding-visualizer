export function generateWalls(grid) {

    let row = grid.length, // width and height of the map
      col = grid[0].length,
      maxPath = Math.floor(row/0.8), // maximum path number
      maxLength = Math.floor(col+row/2), // maximum path length

      map = createArray(1, row, col), // create a 2d array with '1' as every element
      currentRow = Math.floor(Math.random() * row), // current row: start at a random spot
      currentColumn = Math.floor(Math.random() * col), // current column: start at a random spot
      directions = [[-1, 0], [1, 0], [0, -1], [0, 1]], // array to get a random direction from (left,right,up,down)
      lastDirection = [], // save the last direction the path went
      randomDirection; // next turn/direction - holds a value from directions

    while (maxPath && row && maxLength) {

      // get a random direction - until it is a perpendicular to lastDirection
      // if the last direction = left or right,
      // then new direction has to be up or down,
      // and vice versa
      do {
        randomDirection = directions[Math.floor(Math.random() * directions.length)];
      } while ((randomDirection[0] === -lastDirection[0] && randomDirection[1] === -lastDirection[1]) || (randomDirection[0] === lastDirection[0] && randomDirection[1] === lastDirection[1]));

      var randomLength = Math.ceil(Math.random() * maxLength), //length the next path will be (max of maxLength)
        pathLenght = 0; //current length of path being created

    // loop until path is long enough or until the algorithm hit an edge
      while (pathLenght < randomLength) {

        //break the loop if it is going out of the map
        if (((currentRow === 0) && (randomDirection[0] === -1)) ||
            ((currentColumn === 0) && (randomDirection[1] === -1)) ||
            ((currentRow === row - 1) && (randomDirection[0] === 1)) ||
            ((currentColumn === col - 1) && (randomDirection[1] === 1))) {
          break;
        } else {
          map[currentRow][currentColumn] = 0; //set the value of the index in map to 0
          currentRow += randomDirection[0]; //add the value from randomDirection to row and col (-1, 0, or 1) to update location
          currentColumn += randomDirection[1];
          pathLenght++; //increment path's length
        }
      }

      if (pathLenght) { // update variables unless last loop broke before any part of a path is made
        lastDirection = randomDirection; //set lastDirection
        maxPath--; // decrement number of path left to be made
      }
    }
    return map; //return the map of created 
}

//helper function to make a two dimentional array that takes a number and the dimentions of the array
function createArray(num, row, col) {
  var array = [];
  for (var i = 0; i < row; i++) {
    array.push([]);
    for (var j = 0; j < col; j++) {
      array[i].push(num);
    }
  }
  return array;
}
