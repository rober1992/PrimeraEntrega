"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_1 = __importDefault(require("./products"));
const cart_1 = __importDefault(require("./cart"));
const router = express_1.Router();
router.use('/products', products_1.default);
router.use('/cart', cart_1.default);
exports.default = router;
