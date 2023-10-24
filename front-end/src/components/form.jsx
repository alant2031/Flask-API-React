/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'dayjs/locale/pt-br';
import { TextInput, Button, Group, Box, Loader } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm, isNotEmpty } from '@mantine/form';
import { formatStringToDate } from '../utils';
import api from '../api';

function Form() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [isSaving, setIsSaving] = useState(false);
	const [loading, setLoading] = useState(false);

	const form = useForm({
		initialValues: {
			nome: '',
			rg: '',
			cpf: '',
			data_nascimento: '',
			data_admissao: '',
		},

		validate: {
			nome: isNotEmpty('Preencha este campo'),
			cpf: (value) =>
				/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value) ? null : 'CPF inválido',
			rg: isNotEmpty('Preencha este campo'),
			data_nascimento: isNotEmpty('Preencha este campo'),
			data_admissao: isNotEmpty('Preencha este campo'),
		},
	});
	const fetchUser = async () => {
		setLoading(true);
		const resp = await api.getUser(id);
		if (resp) {
			const obj = {
				...resp.data,
				data_nascimento: new Date(resp.data.data_nascimento),
				data_admissao: new Date(resp.data.data_admissao),
			};
			form.setValues(obj);
		} else {
			navigate('/');
		}
		setLoading(false);
	};
	const handleSubmit = async (values) => {
		setIsSaving(true);
		const data = {
			...values,
			data_nascimento: formatStringToDate(values.data_nascimento),
			data_admissao: formatStringToDate(values.data_admissao),
		};
		id ? await api.updateUser(id, data) : await api.createUser(data);
		setIsSaving(false);
		form.reset();
		navigate('/');
	};
	useEffect(() => {
		!!id && fetchUser();
	}, [id]);
	return (
		<Box maw={340} mx="auto">
			{loading ? (
				<Loader color="violet" type="bars" />
			) : (
				<form onSubmit={form.onSubmit(handleSubmit)}>
					<TextInput
						withAsterisk
						label="Nome"
						placeholder="Nome Completo"
						{...form.getInputProps('nome')}
					/>
					<TextInput
						withAsterisk
						label="CPF"
						placeholder="xxx.xxx.xxx-xx"
						{...form.getInputProps('cpf')}
					/>
					<TextInput
						withAsterisk
						label="RG"
						placeholder="Documento RG"
						{...form.getInputProps('rg')}
					/>
					<DateInput
						withAsterisk
						valueFormat="DD/MM/YYYY"
						label="Data de nascimento"
						placeholder="DD/MM/YYYY"
						locale="pt-br"
						{...form.getInputProps('data_nascimento')}
					/>
					<DateInput
						withAsterisk
						valueFormat="DD/MM/YYYY"
						label="Data de admissão"
						placeholder="DD/MM/YYYY"
						locale="pt-br"
						{...form.getInputProps('data_admissao')}
					/>
					<TextInput
						label="Cargo"
						placeholder="Cargo do colaborador"
						{...form.getInputProps('funcao')}
					/>

					<Group justify="flex-end" mt="md">
						<Button
							type="button"
							variant="filled"
							color="gray"
							onClick={() => navigate('/')}
						>
							Cancelar
						</Button>
						<Button type="submit" disabled={isSaving}>
							{isSaving ? 'Salvando . . .' : 'Salvar'}
						</Button>
					</Group>
				</form>
			)}
		</Box>
	);
}

export default Form;
