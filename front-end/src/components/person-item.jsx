import PropTypes from 'prop-types';
import { Paper, Title, Text, Flex } from '@mantine/core';
import Modal from '../components/modal';
import { FaEdit } from 'react-icons/fa';
import { formatStringToDate } from '../utils';
import { useNavigate } from 'react-router-dom';

function PersonItem({ item }) {
	const navigate = useNavigate();
	return (
		<Paper p="lg">
			<Title>{item.nome}</Title>
			<Text>ID: {item.id_pessoa}</Text>
			<Text>CPF: {item.cpf}</Text>
			<Text>RG: {item.rg}</Text>
			<Text>
				Data de nascimento: {formatStringToDate(item.data_nascimento)}
			</Text>
			<Text>Data de admissão: {formatStringToDate(item.data_admissao)}</Text>
			{item.funcao && <Text>Cargo: {item.funcao}</Text>}
			<Flex justify="space-around" mt="lg">
				<FaEdit
					size="20px"
					color="green"
					onClick={() => navigate('/pessoa/edit/' + item.id_pessoa)}
					cursor="pointer"
				/>
				<Modal id={item.id_pessoa} />
			</Flex>
		</Paper>
	);
}

PersonItem.propTypes = {
	item: PropTypes.shape({
		id_pessoa: PropTypes.number,
		nome: PropTypes.string,
		cpf: PropTypes.string,
		rg: PropTypes.string,
		data_nascimento: PropTypes.string,
		data_admissao: PropTypes.string,
		funcao: PropTypes.string,
	}).isRequired,
};

export default PersonItem;
