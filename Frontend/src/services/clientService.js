//Frontend/src/services/clientService.js

import api from './api';

export const getClients = async () => {
  try {
    return await api.get('/clients');
  } catch (error) {
    throw new Error(error);
  }
};

export const getClientById = async (id) => {
  try {
    return await api.get(`/clients/${id}`);
  } catch (error) {
    throw new Error(error);
  }
};

export const saveClient = async (client) => {
  const method = client._id ? 'put' : 'post';
  const url = client._id ? `/clients/${client._id}` : '/clients';

  try {
    return await api[method](url, {
      name: client.name,
      email: client.email,
      phone: client.phone,
      address: client.address,
      cpf: client.cpf
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteClient = async (id) => {
  try {
    return await api.delete(`/clients/${id}`);
  } catch (error) {
    throw new Error(error);
  }
};
