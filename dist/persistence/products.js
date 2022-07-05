"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productPersistence = void 0;
const generateCode_1 = __importDefault(require("./../utils/generateCode"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const filePathProduct = path_1.default.resolve(__dirname, './../data/products.json');
let productos = [];
class Productos {
    findProduct(id) {
        return productos.find(element => element.id == Number(id));
    }
    get(id = undefined) {
        if (id) {
            return this.findProduct(id);
        }
        return productos;
    }
    add(data) {
        const newProduct = {
            id: productos.length + 1,
            timestamp: Date.now(),
            name: data.name,
            price: data.price,
            description: data.description,
            thumbnail: data.thumbnail,
            stock: data.stock,
            code: generateCode_1.default(5)
        };
        productos.push(newProduct);
        const arrayString = JSON.stringify(productos, null, '\t');
        fs_1.default.writeFileSync(filePathProduct, arrayString);
        return newProduct;
    }
    update(id, data) {
        let productUpdate = this.findProduct(id);
        productUpdate.name = data.name;
        productUpdate.price = data.price;
        productUpdate.description = data.description;
        productUpdate.thumbnail = data.thumbnail;
        productUpdate.stock = data.stock;
        const arrayString = JSON.stringify(productos, null, '\t');
        fs_1.default.writeFileSync(filePathProduct, arrayString);
        return productUpdate;
    }
    delete(id) {
        productos = productos.filter((aProduct) => aProduct.id !== id);
        const arrayString = JSON.stringify(productos, null, '\t');
        fs_1.default.writeFileSync(filePathProduct, arrayString);
    }
}
exports.productPersistence = new Productos();
