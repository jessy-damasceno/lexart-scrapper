import type { IProduct } from '../interfaces';

export default class Product implements IProduct {
  public category: 'tv' | 'geladeira' | 'celular';
  public photo: string;
  public description: string;
  public price: string;
  public link: string;

  constructor(product: IProduct) {
    this.category = product.category;
    this.photo = product.photo;
    this.description = product.description;
    this.price = product.price;
    this.link = product.link;
  }
}