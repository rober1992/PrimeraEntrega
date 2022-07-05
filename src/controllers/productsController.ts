import { productPersistence } from "../persistence/products";
import { Request, Response, NextFunction} from 'express';


class ProductController {

    checkAddProduct (req: Request, res: Response, next: NextFunction) {

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

    checkProductExist (req: Request, res: Response, next: NextFunction) {
        const {id} = req.params;
        const producto = productPersistence.get(Number(id));

        if(!producto) {
            return res.status(404).json({
                msg: 'Product not found'
            });
        }

        next();
    }

    getProducts(req: Request, res: Response) {
        const {id} = req.params;

        const producto = id
        ? productPersistence.get(Number(id))
        : productPersistence.get();
        
        if(producto.length == 0){ 
            res.json({
                msg : 'Empty'
            })
        } else {
            res.json({
                productList: producto,
            });
        }
    }

    addProduct(req: Request, res: Response) {
        const newProduct =  productPersistence.add(req.body);

        res.json({
            msg : 'Producto agregado con exito',
            data : newProduct
        })
    }

    updateProduct(req: Request, res: Response) {
        const {id} = req.params;
        const productUpdated = productPersistence.update(Number(id),req.body)

        res.json({
            msg : 'Producto actualizado con exito',
            data : productUpdated
        })
    }

    delete(req: Request, res: Response) {
        const {id} = req.params;
        productPersistence.delete(Number(id));

        res.json({
            msg : 'Producto borrado con exito'
        })
    }
}

export const productController = new ProductController();