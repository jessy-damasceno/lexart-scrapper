import { Model, Schema, model, models } from 'mongoose';
import type IProductInfo from '../interfaces/IProductInfo';
import AbstractODM from './AbstractODM';

class ProductsInfoODM extends AbstractODM<IProductInfo> {
  protected schema: Schema;
  protected model: Model<IProductInfo>;

  constructor() {
    const schema = new Schema<IProductInfo>({
      url: { type: String, required: true },
      category: { type: String, required: true },
      data: [
        {
          photo: { type: String, required: true },
          description: { type: String, required: true },
          price: { type: String },
          category: { type: String, required: true },
          link: { type: String, required: true },
        },
      ],
    });
    super(schema, 'Info');

    this.schema = schema;

    this.model = models.Info || model('Info', this.schema);
  }
  public async create(info: IProductInfo): Promise<IProductInfo> {
    return this.model.create({ ...info });
  }

  public async find(url: string, category: string): Promise<IProductInfo | null> {
    return this.model.findOne({ url, category });
  }

  public async deleteMany(): Promise<{}> {
    return this.model.deleteMany({});
  }
}
export default ProductsInfoODM;
