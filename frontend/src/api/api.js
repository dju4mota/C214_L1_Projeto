// src/api/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:214',
});

export const createUser = (user) => api.post('/usuario', user);
export const updateUser = (id, user) => api.put(`/usuario/${id}`, user);
export const getUsers = () => api.get('/usuario/buscarTodos');
export const getUser = (id) => api.get(`/usuario/${id}`);
export const deleteUser = (id) => api.delete(`/usuario/${id}`);

export const createCard = (card) => api.post('/card', card);

export const createList = (list) => api.post('/usuario/criarLista', list);
export const getLists = (idUsuario) => api.get('/usuario/listas', { params: { idUsuario } });
export const updateList = (list) => api.put('/usuario/atualizarLista', list);
export const deleteList = (list) => api.delete('/usuario/excluirLista', list);

export const checkHealth = () => api.get('/health');

export default api;
