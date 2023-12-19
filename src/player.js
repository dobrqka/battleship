export const player = (name, gameboard) => {
  const attackCoords = (x, y) => {
    return { x, y };
  };

  const botAttackCoords = () => {
    let randomX = Math.floor(Math.random() * 10) + 1;
    let randomY = Math.floor(Math.random() * 10) + 1;
    return { x: randomX, y: randomY };
  };

  return { name, attackCoords, botAttackCoords, gameboard };
};

// module.exports = player;
