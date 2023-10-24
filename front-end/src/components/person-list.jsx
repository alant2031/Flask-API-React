import PropTypes from 'prop-types';
import { Group, Table } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { formatStringToDate } from '../utils';
import { FaEdit, FaEye } from 'react-icons/fa';
import Modal from './modal';

function PersonList({ items }) {
	const navigate = useNavigate();
	const handleClick = (id) => {
		const userUrl = '/pessoa/' + id;
		navigate(userUrl);
	};
	const rows = items.map((item, id) => (
		<Table.Tr key={id}>
			<Table.Td style={{ fontWeight: 'normal' }}>
				{item.nome.split(' ')[0]}
			</Table.Td>
			<Table.Td>{formatStringToDate(item.data_admissao, true)}</Table.Td>
			<Table.Td>
				<Group>
					<FaEye
						size="20px"
						color="black"
						onClick={() => handleClick(item.id_pessoa)}
						cursor="pointer"
					/>
					<FaEdit
						size="20px"
						color="green"
						onClick={() =>
							navigate('/pessoa/edit/' + item.id_pessoa.toString())
						}
						cursor="pointer"
					/>

					<Modal id={item.id_pessoa.toString()} />
				</Group>
			</Table.Td>
		</Table.Tr>
	));
	return (
		<Table striped highlightOnHover withTableBorder withColumnBorders>
			<Table.Thead>
				<Table.Tr>
					<Table.Th>Nome</Table.Th>
					<Table.Th>Data de admissão</Table.Th>
					<Table.Th>Ações</Table.Th>
				</Table.Tr>
			</Table.Thead>
			<Table.Tbody>{rows}</Table.Tbody>
		</Table>
	);
}

PersonList.propTypes = {
	items: PropTypes.array,
};

export default PersonList;
