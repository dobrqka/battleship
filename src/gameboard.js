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
        let slotsAreFree = true;
        for (let i = 0; i < ship.length; i++) {
          if (x + 1 <= 10 && grid[x + 1][y + i].hasShip) {
            slotsAreFree = false;
          }
          if (x - 1 >= 1 && grid[x - 1][y + i].hasShip) {
            slotsAreFree = false;
          }
          if (grid[x][y + i].hasShip) {
            slotsAreFree = false;
          }
          if (i == 0) {
            if (y - 1 >= 1 && grid[x][y - 1].hasShip) {
              slotsAreFree = false;
            }
            if (x + 1 <= 10 && y - 1 >= 1 && grid[x + 1][y - 1].hasShip) {
              slotsAreFree = false;
            }
            if (x - 1 >= 1 && y - 1 >= 1 && grid[x - 1][y - 1].hasShip) {
              slotsAreFree = false;
            }
          }
          if (i == ship.length - 1) {
            if (y + ship.length <= 10 && grid[x][y + ship.length].hasShip) {
              slotsAreFree = false;
            }
            if (
              x + 1 <= 10 &&
              y + ship.length <= 10 &&
              grid[x + 1][y + ship.length].hasShip
            ) {
              slotsAreFree = false;
            }
            if (
              x - 1 >= 1 &&
              y + ship.length <= 10 &&
              grid[x - 1][y + ship.length].hasShip
            ) {
              slotsAreFree = false;
            }
          }
        }
        if (slotsAreFree) {
          for (let i = 0; i < ship.length; i++) {
            grid[x][y + i].hasShip = true;
            grid[x][y + i].name = ship.name;
            grid[x][y + i].theShip = ship;
            allShips[allShips.length] = ship;
          }
        }
      } else {
        return;
      }
    } else if (direction == "yAxis") {
      if (ship.length + x - 2 < 10) {
        let slotsAreFree = true;
        for (let i = 0; i < ship.length; i++) {
          if (y + 1 <= 10 && grid[x + i][y + 1].hasShip) {
            slotsAreFree = false;
          }
          if (y - 1 >= 1 && grid[x + i][y - 1].hasShip) {
            slotsAreFree = false;
          }
          if (grid[x + i][y].hasShip) {
            slotsAreFree = false;
          }
          if (i == 0) {
            if (x - 1 >= 1 && grid[x - 1][y].hasShip) {
              slotsAreFree = false;
            }
            if (y + 1 <= 10 && x - 1 >= 1 && grid[x - 1][y + 1].hasShip) {
              slotsAreFree = false;
            }
            if (y - 1 >= 1 && x - 1 >= 1 && grid[x - 1][y - 1].hasShip) {
              slotsAreFree = false;
            }
          }
          if (i == ship.length - 1) {
            if (x + ship.length <= 10 && grid[x + ship.length][y].hasShip) {
              slotsAreFree = false;
            }
            if (
              y + 1 <= 10 &&
              x + ship.length <= 10 &&
              grid[x + ship.length][y + 1].hasShip
            ) {
              slotsAreFree = false;
            }
            if (
              y - 1 >= 1 &&
              x + ship.length <= 10 &&
              grid[x + ship.length][y - 1].hasShip
            ) {
              slotsAreFree = false;
            }
          }
        }
        if (slotsAreFree) {
          for (let i = 0; i < ship.length; i++) {
            grid[x + i][y].hasShip = true;
            grid[x + i][y].name = ship.name;
            grid[x + i][y].theShip = ship;
            allShips[allShips.length] = ship;
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
