//Frontend/src/services/categoryService.js

import api from './api';

export const getCategories = async () => {
  try {
    return await api.get('/categories');
  } catch (error) {
    throw new Error(error);
  }
};

export const getCategoryById = async (id) => {
  try {
    return await api.get(`/categories/${id}`);
  } catch (error) {
    throw new Error(error);
  }
};

export const saveCategory = async (category) => {
  const method = category._id ? 'put' : 'post';
  const url = category._id ? `/categories/${category._id}` : '/categories';

  try {
    return await api[method](url, {
      name: category.name,
      description: category.description
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteCategory = async (id) => {
  try {
    return await api.delete(`/categories/${id}`);
  } catch (error) {
    throw new Error(error);
  }
};