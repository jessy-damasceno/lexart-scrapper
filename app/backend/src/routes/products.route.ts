import { Router } from 'express';
import ProductsController from '../controllers/products.controller';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get('/', (req, res, next) => productsController.getAll(req, res, next));

export default productsRouter;
