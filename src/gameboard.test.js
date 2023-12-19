const gameboard = require("./gameboard");
const ship = require("./ship");

test("Is ship placed", () => {
  const carrier = ship("Carrier", 5);
  const theBoard = gameboard();
  theBoard.addShip(carrier, 1, 1);
  // write this cleaner with an iteration perhaps
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
  // write this cleaner with an iteration perhaps
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

test("Attack hits a ship", () => {
  const theBoard = gameboard();
  const carrier = ship("Carrier", 5);
  theBoard.addShip(carrier, 1, 1);
  theBoard.receiveAttack(1, 2);
  expect(theBoard.grid[1][2].hit).toBe(true);
  expect(theBoard.grid[1][2].theShip.hits).toBe(1);
});

test("Attack misses a ship", () => {
  const theBoard = gameboard();
  const carrier = ship("Carrier", 5);
  theBoard.addShip(carrier, 1, 1);
  theBoard.receiveAttack(2, 2);
  expect(theBoard.grid[2][2].hit).toBe(true);
  expect(theBoard.grid[2][2].theShip).toBe(undefined);
});

test("Cannot attack same place twice", () => {
  const theBoard = gameboard();
  theBoard.receiveAttack(2, 2);
  expect(theBoard.grid[2][2].hit).toBe(true);
  expect(theBoard.receiveAttack(2, 2)).toEqual("Already attacked.");
});

test("Check if all ships are sunk", () => {
  const theBoard = gameboard();
  const carrier = ship("Carrier", 2);
  const destroyer = ship("Destroyer", 1);
  theBoard.addShip(carrier, 1, 1);
  theBoard.addShip(destroyer, 2, 1);
  theBoard.receiveAttack(1, 1);
  theBoard.receiveAttack(1, 2);
  theBoard.receiveAttack(2, 1);
  expect(theBoard.gameOver()).toEqual(true);
});

test("Check if all ships are sunk 2", () => {
  const theBoard = gameboard();
  const carrier = ship("Carrier", 1);
  const destroyer = ship("Destroyer", 1);
  theBoard.addShip(carrier, 1, 1);
  theBoard.addShip(destroyer, 2, 1);
  theBoard.receiveAttack(1, 1);
  expect(theBoard.gameOver()).toEqual(false);
});
