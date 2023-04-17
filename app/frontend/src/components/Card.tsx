import { FC } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import type IProduct from '../interfaces/IProduct';

interface IProps {
  product: IProduct;
}
const MediaCard: FC<IProps> = ({ product }) => {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <Card sx={{ maxWidth: 330 }}>
      <CardMedia
        sx={{ height: 300 }}
        image={product.photo}
        title={product.description}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {formatter.format(Number(product.price.replace('.', '').replace(',', '.')))}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={ () => window.open(product.link, "_blank")}>
          MORE INFO
        </Button>
      </CardActions>
    </Card>
  );
}

export default MediaCard;
