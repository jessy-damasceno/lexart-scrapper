import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Box,
	Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { useEffect, useState, FC } from 'react';

interface IProps {
	infoFetch: Function;
	isLoading: boolean;
}

const Header: FC<IProps> = ({ infoFetch, isLoading }) => {
	const [url, setUrl] = useState('');
	const [category, setCategory] = useState('');
	const [filter, setFilter] = useState('');
	const [isDisabled, setIsDisabled] = useState(true);

	function handleClick() {
		infoFetch(url, category, filter);
	}

	useEffect(() => {
		if (url && category) {
			setIsDisabled(false);
		} else {
			setIsDisabled(true);
		}
		return () => {
			setIsDisabled(true);
		};
	}, [url, category]);

	console.log(isDisabled);

	return (
		<Box component='form' noValidate sx={{ mt: 1, mb: 4 }}>
			<TextField
				fullWidth
				sx={{ m: 1 }}
				id='outlined-basic'
				label='Digite sua busca'
				variant='outlined'
				value={filter}
				onChange={(event) => setFilter(event.target.value)}
			/>
			<FormControl sx={{ m: 1, minWidth: 160 }} variant='outlined' required>
				<InputLabel id='url-label'>Web</InputLabel>
				<Select
					margin='dense'
					required
					labelId='url-label'
					id='url-select'
					value={url}
					onChange={(event) => setUrl(event.target.value)}
				>
					<MenuItem value={'todas'}>Todas</MenuItem>
					<MenuItem value={'mercadolivre'}>MercadoLivre</MenuItem>
					<MenuItem value={'buscape'}>Buscapé</MenuItem>
				</Select>
			</FormControl>
			<FormControl sx={{ m: 1, minWidth: 160 }} variant='outlined' required>
				<InputLabel id='category-label'>Categorias</InputLabel>
				<Select
					labelId='category-label'
					id='category-select'
					value={category}
					onChange={(event) => setCategory(event.target.value)}
				>
					<MenuItem value={'geladeira'}>Geladeira</MenuItem>
					<MenuItem value={'tv'}>TV</MenuItem>
					<MenuItem value={'celular'}>Celular</MenuItem>
				</Select>
			</FormControl>
			<Button
				variant='contained'
				color='info'
				onClick={handleClick}
				sx={{ m: 1 }}
				disabled={isDisabled}
			>
				{isLoading ? (
					'Buscando'
				) : (
					<>
						<SearchIcon />
						Buscar
					</>
				)}
			</Button>
		</Box>
	);
};

export default Header;
