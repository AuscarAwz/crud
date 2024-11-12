const routers = require('express').Router();
const controllersProducts = require('../controllers/productControllers.js')

routers.get('/', controllersProducts.getAllProducts); //get all products
routers.get('/:_id', controllersProducts.getProductById); //get product by id
routers.post('/', controllersProducts.CreateProduct); //create product
routers.put('/:_id', controllersProducts.UpdateProductById); //update product by id
routers.delete('/:_id', controllersProducts.DeleteProductById); //delete product by id
routers.delete('/products/:productID',controllersProducts.DeleteProductIDById);//delete product by productID


module.exports = routers