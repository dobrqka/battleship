export const gameboard = () => {
  let grid = [[]];

  const gridCreate = (() => {
    for (let i = 1; i <= 10; i++) {
      grid[i] = [{}];
      for (let j = 1; j <= 10; j++) {
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

  const checkIfFree = () => {
    for (i = 0; i < ship.length; i++) {
      if (grid[x][y + i].hasShip) {
        return;
      } else {
      }
    }
  };

  const addShip = (ship, x, y, direction = "xAxis") => {
    if (direction == "xAxis") {
      if (ship.length + y - 2 < 10) {
        for (let i = 0; i < ship.length; i++) {
          if (!grid[x][y + i].hasShip) {
            grid[x][y + i].hasShip = true;
            grid[x][y + i].name = ship.name;
            grid[x][y + i].theShip = ship;
            allShips[allShips.length] = ship;
          } else {
            for (let j = i - 1; j >= 0; j--) {
              grid[x][y + j].hasShip = false;
              grid[x][y + j].name = undefined;
              grid[x][y + j].theShip = undefined;
              allShips[allShips.length - 1] = undefined;
            }
            break;
          }
        }
      } else {
        return;
      }
    } else if (direction == "yAxis") {
      if (ship.length + x - 2 < 10) {
        for (let i = 0; i < ship.length; i++) {
          if (!grid[x][y + i].hasShip) {
            grid[x + i][y].hasShip = true;
            grid[x + i][y].name = ship.name;
            grid[x + i][y].theShip = ship;
            allShips[allShips.length] = ship;
          } else {
            for (let j = i - 1; j >= 0; j--) {
              grid[x + j][y].hasShip = false;
              grid[x + j][y].name = undefined;
              grid[x + j][y].theShip = undefined;
              allShips[allShips.length - 1] = undefined;
            }
            break;
          }
        }
      } else {
        return;
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
        // allShips.shift();
        allShips.splice(i, allShips[i].length);
      } else {
        i++;
      }
    }
    if (allShips.length == 0) {
      isGameOver = true;
    }
    return isGameOver;
  };
  return { grid, addShip, receiveAttack, gameOver, allShips };
};

// module.exports = gameboard;

// ships and their sizes (in squares) should be:
//
// Carrier - 5
// Battleship - 4
// Destroyer - 3
// Submarine - 3
// Patrol boat - 2
