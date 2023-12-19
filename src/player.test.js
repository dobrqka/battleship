const player = require("./player");

test("Player attack coordinates", () => {
  const playerOne = player();
  expect(playerOne.attackCoords(3, 1).x).toBe(3);
  expect(playerOne.attackCoords(3, 1).y).toBe(1);
});

test("Computer attack coordinates", () => {
  const playerOne = player();
  expect(playerOne.botAttackCoords().x).toBeGreaterThan(0);
  expect(playerOne.botAttackCoords().x).toBeLessThan(11);
  expect(playerOne.botAttackCoords().y).toBeGreaterThan(0);
  expect(playerOne.botAttackCoords().y).toBeLessThan(11);
});
