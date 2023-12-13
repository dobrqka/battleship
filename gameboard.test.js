const gameboard = require("./gameboard");
const ship = require("./ship");

test("Is ship placed", () => {
  const carrier = ship("Carrier", 5);
  const theBoard = gameboard();
  theBoard.addShip(carrier, 1, 1);
  expect(theBoard.grid[1][1].name).toBe("Carrier");
  expect(theBoard.grid[1][1].hasShip).toBe(true);
  expect(theBoard.grid[1][2].name).toBe("Carrier");
  expect(theBoard.grid[1][2].hasShip).toBe(true);
  expect(theBoard.grid[1][3].name).toBe("Carrier");
  expect(theBoard.grid[1][3].hasShip).toBe(true);
  expect(theBoard.grid[1][4].name).toBe("Carrier");
  expect(theBoard.grid[1][4].hasShip).toBe(true);
  expect(theBoard.grid[1][5].name).toBe("Carrier");
  expect(theBoard.grid[1][5].hasShip).toBe(true);
});

test("Is ship placed vertically", () => {
  const carrier = ship("Carrier", 5);
  const theBoard = gameboard();
  theBoard.addShip(carrier, 1, 1, "yAxis");
  expect(theBoard.grid[1][1].name).toBe("Carrier");
  expect(theBoard.grid[1][1].hasShip).toBe(true);
  expect(theBoard.grid[2][1].name).toBe("Carrier");
  expect(theBoard.grid[2][1].hasShip).toBe(true);
  expect(theBoard.grid[3][1].name).toBe("Carrier");
  expect(theBoard.grid[3][1].hasShip).toBe(true);
  expect(theBoard.grid[4][1].name).toBe("Carrier");
  expect(theBoard.grid[4][1].hasShip).toBe(true);
  expect(theBoard.grid[5][1].name).toBe("Carrier");
  expect(theBoard.grid[5][1].hasShip).toBe(true);
});
