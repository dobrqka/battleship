const ship = (name, length, hits = 0, isSunk) => {
  return {
    length,
    hits,
    name,
    isSunk() {
      if (this.hits < length) {
        return false;
      } else {
        return true;
      }
    },
    hit() {
      this.hits += 1;
    },
  };
};

module.exports = ship;
