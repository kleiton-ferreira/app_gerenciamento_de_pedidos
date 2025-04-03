//Frontend/src/services/orderService.js

import api from './api';

export const getOrders = async () => {
  try {
    return await api.get('/orders');
  } catch (error) {
    throw new Error(error);
  }
};

export const getOrderById = async (id) => {
  try {
    return await api.get(`/orders/${id}`);
  } catch (error) {
    throw new Error(error);
  }
};

export const saveOrder = async (order) => {
  const method = order._id ? 'put' : 'post';
  const url = order._id ? `/orders/${order._id}` : '/orders';

  try {
    return await api[method](url, {
      client: order.clientId,
      category: order.categoryId,
      seller: order.sellerId,
      amount: order.amount,
      description: order.description
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteOrder = async (id) => {
  try {
    return await api.delete(`/orders/${id}`);
  } catch (error) {
    throw new Error(error);
  }
};
