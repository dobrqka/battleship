import { ship } from "./ship";
import { gameboard } from "./gameboard";
import { player } from "./player";

export const gameLoop = () => {
  let result;
  const gameboardOne = gameboard();
  const gameboardTwo = gameboard();
  const playerOne = player("Dobrin", gameboardOne);
  const playerTwo = player("Bot", gameboardTwo);

  const placeBotShips = (() => {
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
  })();

  return { gameboardOne, gameboardTwo, playerOne, playerTwo };
};

// module.exports = gameLoop;
