// create players and assign gameboards to them
// set loop of taking turns and check if all ships are sunk after each turn
// const ship = require("./ship");
// const gameboard = require("./gameboard");
// const player = require("./player");

import { ship } from "./ship";
import { gameboard } from "./gameboard";
import { player } from "./player";

export const gameLoop = () => {
  let result;
  const gameboardOne = gameboard();
  const gameboardTwo = gameboard();
  const playerOne = player("Dobrin", gameboardOne);
  const playerTwo = player("Bot", gameboardTwo);

  playerOne.gameboard.addShip(ship("Carrier", 5), 9, 6);
  playerOne.gameboard.addShip(ship("Battleship", 4), 4, 7, "yAxis");
  playerOne.gameboard.addShip(ship("Destroyer", 3), 1, 7);
  playerOne.gameboard.addShip(ship("Submarine", 2), 5, 2);
  playerOne.gameboard.addShip(ship("Patrol", 1), 2, 2);

  let botCoords = playerTwo.botAttackCoords();

  const randomAxis = () => {
    let axis = "xAxis";
    const randomNumber = Math.floor(Math.random() * 2);
    if (randomNumber == 1) {
      axis = "yAxis";
    }
    return axis;
  };

  while (playerTwo.gameboard.allShips.length <= 0) {
    botCoords = playerTwo.botAttackCoords();
    playerTwo.gameboard.addShip(
      ship("Carrier", 5),
      botCoords.x,
      botCoords.y,
      randomAxis()
    );
  }
  botCoords = playerTwo.botAttackCoords();
  while (playerTwo.gameboard.allShips.length <= 5) {
    botCoords = playerTwo.botAttackCoords();
    playerTwo.gameboard.addShip(
      ship("Battleship", 4),
      botCoords.x,
      botCoords.y,
      randomAxis()
    );
  }

  botCoords = playerTwo.botAttackCoords();
  while (playerTwo.gameboard.allShips.length <= 9) {
    botCoords = playerTwo.botAttackCoords();
    playerTwo.gameboard.addShip(
      ship("Destroyer", 3),
      botCoords.x,
      botCoords.y,
      randomAxis()
    );
  }

  botCoords = playerTwo.botAttackCoords();

  while (playerTwo.gameboard.allShips.length <= 12) {
    botCoords = playerTwo.botAttackCoords();
    playerTwo.gameboard.addShip(
      ship("Submarine", 2),
      botCoords.x,
      botCoords.y,
      randomAxis()
    );
  }

  botCoords = playerTwo.botAttackCoords();
  while (playerTwo.gameboard.allShips.length <= 14) {
    botCoords = playerTwo.botAttackCoords();
    playerTwo.gameboard.addShip(
      ship("Patrol", 1),
      botCoords.x,
      botCoords.y,
      randomAxis()
    );
  }

  return { gameboardOne, gameboardTwo, playerOne, playerTwo };
};

// module.exports = gameLoop;
