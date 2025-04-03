//Frontend/src/services/sellerService.js

import api from './api';

export const getSellers = async () => {
  try {
    return await api.get('/sellers');
  } catch (error) {
    throw new Error(error);
  }
};

export const getSellerById = async (id) => {
  try {
    return await api.get(`/sellers/${id}`);
  } catch (error) {
    throw new Error(error);
  }
};

export const saveSeller = async (seller) => {
  const method = seller._id ? 'put' : 'post';
  const url = seller._id ? `/sellers/${seller._id}` : '/sellers';

  try {
    return await api[method](url, {
      name: seller.name,
      email: seller.email,
      phone: seller.phone,
      cpf: seller.cpf
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteSeller = async (id) => {
  try {
    return await api.delete(`/sellers/${id}`);
  } catch (error) {
    throw new Error(error);
  }
};
