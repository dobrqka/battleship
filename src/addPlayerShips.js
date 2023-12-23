import { ship } from "./ship";

export const addPlayerShips = (gameboard) => {
  const playerSquares = document.querySelectorAll(".square-one");
  const addCarrier = (x, y) => {
    gameboard.addShip(ship("Carrier", 5), x, y);
  };

  return { addCarrier };

  //   return { addCarrier, addBattleship, addDestroyer, addSubmarine, addPatrol };
};
