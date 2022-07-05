"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartPersistence = void 0;
const generateCode_1 = __importDefault(require("./../utils/generateCode"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const filePathProduct = path_1.default.resolve(__dirname, './../data/cart.json');
class Cart {
    constructor() {
        this.id = generateCode_1.default(5);
        this.timestamp = Date.now();
        this.productos = new Array;
    }
    addProductsCart(data) {
        this.productos.push(data);
        const arrayString = JSON.stringify(this.productos, null, '\t');
        fs_1.default.writeFileSync(filePathProduct, arrayString);
    }
    getProductsCart(id = undefined) {
        if (id) {
            return this.productos.find(element => element.id == Number(id));
        }
        return this.productos;
    }
    deleteProductsCart(id) {
        this.productos = this.productos.filter(aProduct => aProduct.id !== id);
        const arrayString = JSON.stringify(this.productos, null, '\t');
        fs_1.default.writeFileSync(filePathProduct, arrayString);
    }
}
exports.cartPersistence = new Cart();
