import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { IError, IScrapper } from '../interfaces';
import ProductsService from '../services/products.service';

export default class ProductsController {
  private service;

  constructor() {
    this.service = new ProductsService();
  }

  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { url, category } = req.query;
      const products = await this.service.getAll({ url, category } as IScrapper);

      return res.status(StatusCodes.OK).json(products);
    } catch (error) {
      return next({ ...(error as IError) });
    }
  }
}
