/* eslint-disable react-hooks/exhaustive-deps */
import { useParams, useNavigate } from 'react-router-dom';
import { Loader, Flex } from '@mantine/core';
import api from '../api';
import { useEffect, useState } from 'react';
import PersonItem from '../components/person-item';

function PersonDetails() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(false);
	const fetchUser = async () => {
		setLoading(true);
		const resp = await api.getUser(id);
		if (resp) {
			setUser(resp.data);
		} else {
			navigate('/');
		}
		setLoading(false);
	};
	useEffect(() => {
		fetchUser();
	}, [id]);
	return (
		<Flex ml="lg">
			{loading ? (
				<Loader color="violet" type="bars" />
			) : (
				<PersonItem item={user} />
			)}
		</Flex>
	);
}

export default PersonDetails;
