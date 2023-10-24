import { Container, Loader } from '@mantine/core';
import { useEffect, useState } from 'react';
import PersonList from '../components/person-list';
import api from '../api';

function Home() {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(false);

	const fetchUsers = async () => {
		setLoading(true);
		const resp = await api.getAllUsers();
		setLoading(false);
		setUsers(resp.data);
	};
	useEffect(() => {
		fetchUsers();
	}, []);
	return (
		<Container size="md" m="lg">
			{loading ? (
				<Loader color="violet" type="bars" />
			) : (
				<PersonList items={users} />
			)}
		</Container>
	);
}

export default Home;
