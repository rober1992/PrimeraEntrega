import generateRandomString from './../utils/generateCode';
import fs from 'fs';
import path from 'path';

const filePathProduct = path.resolve(__dirname, './../data/products.json');
let productos : Array<any> = [];



interface addProduct {
    name : string,
    price : number,
    description : string,
    thumbnail : string,
    stock : number,
}


class Productos {


    findProduct (id : number) {
        return  productos.find(element => element.id == Number(id));
    }


     get(id: number | undefined = undefined) {
        if(id) {
            return  this.findProduct(id);
        }
        return productos;
    }

    add(data : addProduct) {

        const newProduct = {
            id : productos.length +1,
            timestamp : Date.now(),
            name : data.name,
            price : data.price,
            description : data.description,
            thumbnail : data.thumbnail,
            stock : data.stock,
            code : generateRandomString(5)
        }

        productos.push(newProduct);
        const arrayString = JSON.stringify(productos, null, '\t')
        fs.writeFileSync(filePathProduct, arrayString);

        return newProduct
    }


    update (id : number, data : addProduct) {
        let productUpdate = this.findProduct(id);

        productUpdate.name = data.name;
        productUpdate.price = data.price;
        productUpdate.description = data.description;
        productUpdate.thumbnail = data.thumbnail;
        productUpdate.stock = data.stock;

        const arrayString = JSON.stringify(productos, null, '\t')
        fs.writeFileSync(filePathProduct, arrayString)
        return productUpdate;
    }


    delete (id : number) {
        productos = productos.filter((aProduct) => aProduct.id !== id);
        const arrayString = JSON.stringify(productos, null, '\t')
        fs.writeFileSync(filePathProduct, arrayString);
    }
}

export const productPersistence = new Productos();
