"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productsController_1 = require("../controllers/productsController");
const cartController_1 = require("../controllers/cartController");
const router = express_1.Router();
router.get('/list', cartController_1.cartController.getProducts);
router.get('/list/:id', cartController_1.cartController.checkProductExist, cartController_1.cartController.getProducts);
router.post('/add/:id', productsController_1.productController.checkProductExist, cartController_1.cartController.addProductsCartID);
router.delete('/delete/:id', cartController_1.cartController.checkProductExist, cartController_1.cartController.deleteProductCart);
exports.default = router;
