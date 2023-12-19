import "./style.css";
import { gameLoop } from "./gameLoop.js";

const theGame = gameLoop();
const boardOne = theGame.gameboardOne;
const boardTwo = theGame.gameboardTwo;

const renderBoards = (() => {
  const domBoardOne = document.querySelector(".board-one");
  const domBoardTwo = document.querySelector(".board-two");

  boardOne.grid.forEach((item) => {
    if (item !== boardOne.grid[0]) {
      item.forEach((subitem) => {
        if (subitem !== item[0]) {
          const square = document.createElement("div");
          square.classList.add("square-one");
          domBoardOne.appendChild(square);
          square.setAttribute("data-x", `${boardOne.grid.indexOf(item)}`);
          square.setAttribute("data-y", `${item.indexOf(subitem)}`);
          if (subitem.hasShip) {
            square.classList.add("ship");
          }
        }
      });
    }
  });

  boardTwo.grid.forEach((item) => {
    if (item !== boardTwo.grid[0]) {
      item.forEach((subitem) => {
        if (subitem !== item[0]) {
          const square = document.createElement("div");
          square.classList.add("square-two");
          domBoardTwo.appendChild(square);
          square.setAttribute("data-x", `${boardTwo.grid.indexOf(item)}`);
          square.setAttribute("data-y", `${item.indexOf(subitem)}`);
          if (subitem.hasShip) {
            square.classList.add("bot-ship");
          }
        }
      });
    }
  });
})();

const playerOneSquares = document.querySelectorAll(".square-one");
const playerTwoSquares = document.querySelectorAll(".square-two");

const attack = (() => {
  playerTwoSquares.forEach((square) => {
    square.addEventListener("click", () => {
      let x = +square.getAttribute("data-x");
      let y = +square.getAttribute("data-y");
      if (boardTwo.grid[x][y].hit) {
        return;
      }
      boardTwo.receiveAttack(x, y);
      if (boardTwo.grid[x][y].hasShip && boardTwo.grid[x][y].hit) {
        square.classList.add("hit");
        console.log(boardTwo.gameOver());
        if (boardTwo.gameOver()) {
          alert("Game over.");
          return;
        }
      } else {
        square.classList.add("miss");
      }

      let botAttackX = theGame.playerTwo.botAttackCoords().x;
      let botAttackY = theGame.playerTwo.botAttackCoords().y;

      while (boardOne.grid[botAttackX][botAttackY].hit) {
        botAttackX = theGame.playerTwo.botAttackCoords().x;
        botAttackY = theGame.playerTwo.botAttackCoords().y;
      }
      boardOne.receiveAttack(botAttackX, botAttackY);

      let theSquare;
      playerOneSquares.forEach((mySquare) => {
        if (
          +mySquare.getAttribute("data-x") == botAttackX &&
          +mySquare.getAttribute("data-y") == botAttackY
        ) {
          theSquare = mySquare;
        }
      });

      if (
        boardOne.grid[botAttackX][botAttackY].hasShip &&
        boardOne.grid[botAttackX][botAttackY].hit
      ) {
        theSquare.classList.add("hit");
        console.log(boardOne.gameOver());
        if (boardOne.gameOver()) {
          alert("Game over.");
        }
      } else {
        theSquare.classList.add("miss");
      }
    });
  });
})();
