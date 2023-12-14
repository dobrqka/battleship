const gameboard = () => {
  let grid = [[]];

  const gridCreate = (() => {
    for (i = 1; i <= 10; i++) {
      grid[i] = [{}];
      for (j = 1; j <= 10; j++) {
        grid[i][j] = {
          hit: false,
          hasShip: false,
          name: undefined,
          theShip: undefined,
        };
      }
    }
  })();

  let allShips = [];

  const addShip = (ship, x, y, direction = "xAxis") => {
    if (direction == "xAxis") {
      for (let i = 0; i < ship.length; i++) {
        grid[x][y + i].hasShip = true;
        grid[x][y + i].name = ship.name;
        grid[x][y + i].theShip = ship;
        allShips[allShips.length] = ship;
      }
    } else if (direction == "yAxis") {
      for (let i = 0; i < ship.length; i++) {
        grid[x + i][y].hasShip = true;
        grid[x + i][y].name = ship.name;
        grid[x + i][y].theShip = ship;
        allShips[allShips.length] = ship;
      }
    }
  };

  const receiveAttack = (x, y) => {
    if (grid[x][y].hit) {
      return "Already attacked.";
    } else if (grid[x][y].hasShip) {
      grid[x][y].theShip.hits += 1;
      grid[x][y].hit = true;
    } else {
      grid[x][y].hit = true;
    }
  };

  const gameOver = () => {
    let isGameOver = false;
    let i = 0;
    while (i < allShips.length) {
      if (allShips[i].hits == allShips[i].length) {
        allShips.shift();
      } else {
        i++;
      }
    }
    if (allShips.length == 0) {
      isGameOver = true;
    }
    return isGameOver;
  };

  return { grid, addShip, receiveAttack, gameOver };
};

module.exports = gameboard;

// ships and their sizes (in squares) should be:
//
// Carrier - 5
// Battleship - 4
// Destroyer - 3
// Submarine - 3
// Patrol boat - 2
