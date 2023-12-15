const sequelize = require("../DB/connection")
const { DataTypes } = require('sequelize');
const product = require("../Models/product")
const order = require("../Models/order")
const ProductOrder = sequelize.define('product_order', {
    quantity: DataTypes.INTEGER,
});

product.belongsToMany(order, { through: ProductOrder })

module.exports = {
 create(req, res) {
    return product
        .create ({
             id: req.body.id,
             name: req.body.name,
             price: req.body.price,
             createdAt: new Date(),
             updatedAt: new Date(),
        })
        .then(product => res.status(200).send(product))
        .catch(error => res.status(400).send(error))
 },
 list(_, res) {
     return product.findAll({})
        .then(product => res.status(200).send(product))
        .catch(error => res.status(400).send(error))
 },
 find (req, res) {
     return product.findAll({
         where: {
            id: req.body.id
         }
     })
     .then(product => res.status(200).send(product))
     .catch(error => res.status(400).send(error))
  },
  edit (req, res) {
    return product.update(
    {
        name: req.body.name,
        price: req.body.price
    },
        { where: { id: req.body.id } } 
    )
    .then(product => res.status(200).send(product))
    .catch(error => res.status(400).send(error))
 },
 delete (req, res) {
    return product.destroy(
        { where: { id: req.body.id } } 
    )
    .then(product => res.sendStatus(200))
    .catch(error => res.status(400).send(error))
 } 
};