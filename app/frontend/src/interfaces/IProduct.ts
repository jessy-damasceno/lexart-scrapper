export default interface IProduct {
  photo: string;
  description: string;
  price: string;
  link: string;
  category: 'tv' | 'geladeira' | 'celular';
}
