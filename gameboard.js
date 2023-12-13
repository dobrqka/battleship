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
        };
      }
    }
  })();

  const addShip = (ship, x, y, direction = "xAxis") => {
    if (direction == "xAxis") {
      for (let i = 0; i < ship.length; i++) {
        grid[x][y + i].hasShip = true;
        grid[x][y + i].name = ship.name;
      }
    } else if (direction == "yAxis") {
      for (let i = 0; i < ship.length; i++) {
        grid[x + i][y].hasShip = true;
        grid[x + i][y].name = ship.name;
      }
    }
  };
  return { grid, addShip };
};

module.exports = gameboard;

/// should be 10x10; 1 axis is represented by numbers
//  while the other by letters

// ships and their sizes (in squares) should be:
//
// Carrier - 5
// Battleship - 4
// Destroyer - 3
// Submarine - 3
// Patrol boat - 2
