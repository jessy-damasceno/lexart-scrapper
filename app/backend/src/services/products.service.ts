import ProductsODM from '../models/ProductsInfoODM';
import { infoScrapper } from '../utils/data_scrapper';
import type { IProduct, IProductInfo, IScrapper } from '../interfaces';
import Product from '../domains/Product';

export default class ProductsService {
  private createProductDomain(product: IProduct): Product {
    return new Product(product);
  }

  public async getAll({ url, category }: IScrapper): Promise<IProductInfo> {
    const productsODM = new ProductsODM();
    const storedInfo = await productsODM.find(url as string, category);

    if (storedInfo) {
      return storedInfo;
    }

    const scrapData = await infoScrapper({ url, category });
    const products = scrapData.map(product => this.createProductDomain(product));

    await productsODM.deleteMany();

    const data = await productsODM.create({ url, category, data: products });

    return data;
  }
}

export async function getAll(args: IScrapper): Promise<IProductInfo> {
  const { url, category } = args;
  const productsODM = new ProductsODM();
  const storedInfo = await productsODM.find(url as string, category);

  if (storedInfo) {
    return storedInfo;
  }

  const products = await infoScrapper({ url, category });
  await productsODM.deleteMany();
  const data = await productsODM.create({ url, category, data: products });

  return data;
}
