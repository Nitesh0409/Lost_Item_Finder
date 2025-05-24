const lost = require("./lostItems");
const found = require("./foundItems");

module.exports = {
  addLostItem: lost.addLostItem,
  getAllLostItems: lost.getAllLostItems,
  addFoundItem: found.addFoundItem,
  getAllFoundItems: found.getAllFoundItems,
};
