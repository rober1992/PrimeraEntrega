"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const products_1 = require("../persistence/products");
class ProductController {
    checkAddProduct(req, res, next) {
        const { name, price, description, thumbnail, stock } = req.body;
        if (!name || !price || !description || !thumbnail || !stock ||
            typeof name !== 'string' ||
            typeof description !== 'string' ||
            typeof thumbnail !== 'string' ||
            isNaN(stock) ||
            isNaN(price)) {
            return res.status(400).json({
                msg: 'Campos del body invalidos',
            });
        }
        next();
    }
    checkProductExist(req, res, next) {
        const { id } = req.params;
        const producto = products_1.productPersistence.get(Number(id));
        if (!producto) {
            return res.status(404).json({
                msg: 'Product not found'
            });
        }
        next();
    }
    getProducts(req, res) {
        const { id } = req.params;
        const producto = id
            ? products_1.productPersistence.get(Number(id))
            : products_1.productPersistence.get();
        if (producto.length == 0) {
            res.json({
                msg: 'Empty'
            });
        }
        else {
            res.json({
                productList: producto,
            });
        }
    }
    addProduct(req, res) {
        const newProduct = products_1.productPersistence.add(req.body);
        res.json({
            msg: 'Producto agregado con exito',
            data: newProduct
        });
    }
    updateProduct(req, res) {
        const { id } = req.params;
        const productUpdated = products_1.productPersistence.update(Number(id), req.body);
        res.json({
            msg: 'Producto actualizado con exito',
            data: productUpdated
        });
    }
    delete(req, res) {
        const { id } = req.params;
        products_1.productPersistence.delete(Number(id));
        res.json({
            msg: 'Producto borrado con exito'
        });
    }
}
exports.productController = new ProductController();
