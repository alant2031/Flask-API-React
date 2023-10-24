import { useNavigate } from 'react-router-dom';
import { AiFillHome, AiOutlineUserAdd } from 'react-icons/ai';
import { Flex } from '@mantine/core';

function HeadButtons() {
	const navigate = useNavigate();
	return (
		<Flex gap="lg" m="lg">
			<AiFillHome size="30px" cursor="pointer" onClick={() => navigate('/')} />
			<AiOutlineUserAdd
				size="30px"
				color="green"
				cursor="pointer"
				onClick={() => navigate('/pessoa/new')}
			/>
		</Flex>
	);
}

export default HeadButtons;
