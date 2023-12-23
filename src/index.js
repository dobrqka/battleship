import "./style.css";
import { gameLoop } from "./gameLoop.js";
import { ship } from "./ship";

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
          // if (subitem.hasShip) {
          //   square.classList.add("bot-ship");
          // }
        }
      });
    }
  });
})();

const attack = () => {
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
          alert("You win!");
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
};

const playerOneSquares = document.querySelectorAll(".square-one");
const playerTwoSquares = document.querySelectorAll(".square-two");
const axisButton = document.querySelector(".axis");
axisButton.addEventListener("click", () => {
  if (axisButton.textContent == "xAxis") {
    axisButton.textContent = "yAxis";
  } else if (axisButton.textContent == "yAxis") {
    axisButton.textContent = "xAxis";
  }
});

const addPlayerShips = () => {
  const placeShip = (name, length, square) => {
    boardOne.addShip(
      ship(name, length),
      +square.getAttribute("data-x"),
      +square.getAttribute("data-y"),
      axisButton.textContent
    );
    boardOne.grid.forEach((item) => {
      if (item !== boardOne.grid[0]) {
        item.forEach((subitem) => {
          if (subitem !== item[0]) {
            if (subitem.hasShip) {
              playerOneSquares.forEach((box) => {
                if (
                  box.getAttribute("data-x") == boardOne.grid.indexOf(item) &&
                  box.getAttribute("data-y") == item.indexOf(subitem)
                ) {
                  box.classList.add("ship");
                }
              });
            }
          }
        });
      }
    });
  };

  alert("Place your ships on the left board.");
  const boardTwoDom = document.querySelector(".board-two");
  boardTwoDom.style.opacity = "0.1";
  playerOneSquares.forEach((square) => {
    square.addEventListener("click", () => {
      if (boardOne.allShips.length == 0) {
        placeShip("Carrier", 5, square);
      } else if (boardOne.allShips.length == 5) {
        placeShip("Battleship", 4, square);
      } else if (boardOne.allShips.length == 9) {
        placeShip("Destroyer", 3, square);
      } else if (boardOne.allShips.length == 12) {
        placeShip("Submarine", 2, square);
      } else if (boardOne.allShips.length == 14) {
        placeShip("Patrol", 1, square);
        alert("Attack the right board!");
        attack();
        boardTwoDom.style.opacity = "1";
      }
    });
  });
};

addPlayerShips();

// const newGame = (() => {
//   const newButton = document.querySelector(".new-game");
//   newButton.addEventListener("click", () => {
//     boardOne.allShips = [];
//     boardTwo.allShips = [];
//     playerOneSquares.forEach((square) => {
//       square.className = "square-one";
//     });
//     playerTwoSquares.forEach((square) => {
//       square.className = "square-two";
//     });
//     addPlayerShips();
//   });
// })();
