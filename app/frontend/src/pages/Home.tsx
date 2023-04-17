import { Grid } from '@mui/material';
import { FC } from 'react';
import MediaCard from '../components/Card';
import type IProduct from '../interfaces/IProduct';

interface IProps {
  products: IProduct[];
}

const Home: FC<IProps> = ({ products }) => {
  return (
    <Grid container spacing={8}>
      {products &&
        products.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <MediaCard product={product} />
          </Grid>
        ))
      }
    </Grid>
  );
};

export default Home;
