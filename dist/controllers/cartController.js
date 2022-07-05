"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartController = void 0;
const products_1 = require("../persistence/products");
const cart_1 = require("../persistence/cart");
class CartController {
    checkProductExist(req, res, next) {
        const idProd = Number(req.params.id);
        ;
        const producto = cart_1.cartPersistence.getProductsCart(idProd);
        if (producto === undefined) {
            return res.status(404).json({
                msg: 'Product not found'
            });
        }
        next();
    }
    getProducts(req, res) {
        const idProd = Number(req.params.id);
        res.json({
            ID: cart_1.cartPersistence.id,
            timestamp: cart_1.cartPersistence.timestamp,
            productListCart: cart_1.cartPersistence.getProductsCart(idProd)
        });
    }
    addProductsCartID(req, res) {
        const idProd = Number(req.params.id);
        const productToAdd = products_1.productPersistence.get(idProd);
        cart_1.cartPersistence.addProductsCart(productToAdd);
        res.json({
            msg: 'Product added successfully'
        });
    }
    deleteProductCart(req, res) {
        const idProd = Number(req.params.id);
        cart_1.cartPersistence.deleteProductsCart(idProd);
        res.json({
            msg: 'Product deleted successfully'
        });
    }
}
exports.cartController = new CartController();
