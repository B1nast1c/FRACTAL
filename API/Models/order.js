const Sequelize = require("sequelize");
const sequelize = require("../DB/connection");

const Order = sequelize.define("order", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdAt:{
    type: Sequelize.DATE,
    allowNull: true,
  },
  updatedAt:{
    type: Sequelize.DATE,
    allowNull: true,
  } 
}, { timestamps: false });

module.exports = Order;