import toast from 'react-hot-toast';
import instance from './instance';

const getAllUsers = async () => {
	try {
		return await instance.get('/pessoas');
	} catch (e) {
		toast.error(e.message);
	}
};

const createUser = async (data) => {
	try {
		await instance.post('/pessoa', data);
		toast.success('Usuário salvo com sucesso');
	} catch (e) {
		toast.error(e.message);
	}
};

const updateUser = async (id, data) => {
	try {
		await instance.patch('/edit/pessoa/' + id, data);
		toast.success('Usuário salvo com sucesso');
	} catch (e) {
		toast.error(e.message);
	}
};

const getUser = async (id) => {
	try {
		return await instance.get('/pessoa/' + id);
	} catch (e) {
		toast.error(e.message);
	}
};
const deleteUser = async (id) => {
	try {
		await instance.delete('/delete/pessoa/' + id);
		toast.success('Usuário removido com sucesso');
	} catch (e) {
		toast.error(e.message);
	}
};

export default { getAllUsers, createUser, getUser, deleteUser, updateUser };
