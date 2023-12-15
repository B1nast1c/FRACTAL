const router = require("express").Router()
const productController = require("../Controllers/product")
const orderController = require("../Controllers/order")
//No olvidar el res.send

router.get("/products", (req, res) => {
    return productController.list(req, res)
})

router.get("/orders", (req, res) => {
    return orderController.list(req, res)
})

//Crear elementos
router.post("/product", (req, res) => {
    return productController.create(req, res)
})

router.post("/order", (req, res) => {
    return orderController.create(req, res)
})

//Editar elementos
router.put("/product", (req, res) => {
    return productController.edit(req, res)
})

router.put("/order", (req, res) => {
    return orderController
})

//Eliminar elementos
router.delete("/product", (req, res) => {
    return productController.delete(req, res)
})

router.delete("/order", (req, res) => {
    return orderController.delete(req, res)
})

module.exports = router