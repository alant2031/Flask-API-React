import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { Modal as ModalComp, Group, Button, Loader } from '@mantine/core';
import { FaTrashAlt } from 'react-icons/fa';
import api from '../api';

function Modal({ id }) {
	const navigate = useNavigate();
	const [opened, { open, close }] = useDisclosure(false);
	const [loading, setLoading] = useState(false);

	const handleClick = async (userId) => {
		setLoading(true);
		await api.deleteUser(userId);
		setLoading(false);
		close();
		navigate('/');
	};
	return (
		<>
			<ModalComp
				opened={opened}
				onClose={close}
				title="Excluir este item?"
				centered
			>
				{loading ? (
					<Loader color="violet" type="bars" />
				) : (
					<Group>
						<Button onClick={() => handleClick(id)}>Sim</Button>
						<Button onClick={close}>Não</Button>
					</Group>
				)}
			</ModalComp>

			<FaTrashAlt onClick={open} size="20px" color="red" cursor="pointer" />
		</>
	);
}

Modal.propTypes = {
	id: PropTypes.string.isRequired,
};

export default Modal;
