const sequelize = require("../DB/connection")
const { DataTypes } = require('sequelize');
const product = require("../Models/product")
const order = require("../Models/order")

const ProductOrder = sequelize.define('product_order', {
    quantity: DataTypes.INTEGER,
});

order.belongsToMany(product, { through: ProductOrder })

module.exports = {
    async create(req, res) { //Post
        const tempOrder = await order
            .create({
                id: req.body.data.id,
                status: req.body.data.status,
                createdAt: new Date(),
                updatedAt: new Date(),
            })

            req.body.data.products.forEach(
                function(obj) {
                    ProductOrder.create(
                        {
                            orderId: req.body.data.id,
                            productId: obj.productId,
                        }
                    )
                    .then(_ => console.log("Producto Agregado"))
                }
            )
        return tempOrder
    },
    async list(_, res) { //Get
        try {
            const orders = await order.findAll({}) //Todas las ordenes
            const totalOrders = []
    
            await Promise.all(orders.map(async (item) => {
                const orderWithProducts = await order.findOne( //Interseccion + Similar a Cursor
                    {
                        where: { id: item.id },
                        include: [
                            {
                                model: product,
                                attributes: ['id', 'name', 'price'],
                                through: { attributes: ['productId']} //Inner Join
                            }
                        ]
                });
    
                const products = orderWithProducts.products.map(product => {
                    return {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        quantity: product.product_order.quantity,
                        };
                });
    
                totalOrders.push({
                    orderId: item.id,
                    orderNumber: item.id,
                    products: products,
                    quantity: products.length,
                    total: products.reduce((total, product) => total + product.price, 0),
                    status: item.status,
                    date: item.createdAt
                })       
            }));
            
            res.status(200).send(totalOrders)
        } catch (error) {
            res.status(500).send(error)
        }
        
    },
    find(req, res) { //Get Individual + Condiciones
        return order.findAll({
            where: {
                id: req.body.id,
            }
        })
            .then(product => res.status(200).send(product))
            .catch(error => res.status(400).send(error))
    },
    edit(req, res) { //Update los productos, no la orden
        return ProductOrder.update(
            {
                orderId: req.body.orderId,
                productId: req.body.productId,
            },
            { where: { id: req.body.orderId } }
        )
            .then(product => res.status(200).send(product))
            .catch(error => res.status(400).send(error))
    },
    async delete(req, res) { //Destruye el ProductOrder y luego el Order
        try {
            const product_order = await ProductOrder.destroy({ where: { orderId: req.body.id }})
            const order_destroy = await order.destroy({ where: { id: req.body.id }})
            res.sendStatus(200)     
        } catch (error) {
            res.status(400).send(error)
        }
        
    }
};