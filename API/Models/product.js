const Sequelize = require("sequelize");
const sequelize = require("../DB/connection");

const Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT,
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

module.exports = Product;