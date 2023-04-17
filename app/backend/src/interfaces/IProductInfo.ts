import IProduct from './IProduct';
import IScrapper from './IScrapper';

export default interface IProductInfo extends IScrapper {
  data: IProduct[];
}
