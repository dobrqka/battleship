const ship = require("./ship");

test("Assign ship properties", () => {
  expect(ship(3, 2, false).length).toEqual(3);
  expect(ship(3, 2, false).hits).toEqual(2);
  expect(ship(3, 2, false).isSunk()).toEqual(false);
});

test("Default state of ship is not sunk.", () => {
  expect(ship(5, 1).isSunk()).toEqual(false);
});

test("Default hits on ship is 0.", () => {
  expect(ship(5).hits).toEqual(0);
});

test("Hits method increments hits.", () => {
  const theShip = ship(3);
  theShip.hit();
  expect(theShip.hits).toEqual(1);
});

test("Hits method increments hits 2.", () => {
  const theShip = ship(3, 1);
  theShip.hit();
  expect(theShip.hits).toEqual(2);
});

test("Ship is sunk.", () => {
  expect(ship(3, 3).isSunk()).toEqual(true);
});

test("Ship is not sunk.", () => {
  expect(ship(5, 4).isSunk()).toEqual(false);
});

test("Ship gets sunk after final hit.", () => {
  const theShip = ship(3, 2);
  expect(theShip.isSunk()).toEqual(false);
  theShip.hit();
  expect(theShip.isSunk()).toEqual(true);
});
