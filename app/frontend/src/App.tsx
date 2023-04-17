import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import axios from 'axios';
import Home from './pages/Home';
import type IProduct from './interfaces/IProduct';
import { Grid } from '@mui/material';

const API_URL = 'https://lexart-scrapper-production.up.railway.app';

function App() {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	function infoFetch(url: string, category: string, filter: string) {
		setIsLoading(true);
		axios
			.get(`${API_URL}/products?url=${url}&category=${category}`)
			.then(({ data }) => {
				setProducts(
					data.data.filter((e: IProduct) =>
						e.description.toLowerCase().includes(filter.toLowerCase())
					)
				);
				setIsLoading(false);
				console.log(products);
			});
	}

	return (
		<Grid
      container
      spacing={0}
			direction='column'
			alignItems='center'
			justifyContent='center'
      style={{ minHeight: '100vh' }}
			className='App'
		>
			<Header infoFetch={infoFetch} isLoading={isLoading} />
			<Home products={products} />
		</Grid>
	);
}

export default App;
