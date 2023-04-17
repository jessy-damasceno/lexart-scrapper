import express from 'express';
import cors from 'cors';
import ErrorHandler from './middlewares/ErrorHandler';
import productsRouter from './routes/products.route';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/products', productsRouter);

app.use(ErrorHandler.handle);

export default app;
