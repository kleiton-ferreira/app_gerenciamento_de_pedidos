//Frontend/src/pages/categories/CatogoryList

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, deleteCategory } from '../../services/categoryService';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta categoria?')) {
      try {
        await deleteCategory(id);
        const updatedCategories = await getCategories();
        setCategories(updatedCategories);
      } catch (err) {
        setError(err.message || 'Erro ao excluir categoria');
      }
    }
  };

  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category._id.includes(searchTerm) ||
    (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) return <div className="text-center py-8">Carregando...</div>;
  if (error) return <div className="alert alert-error">{error}</div>;

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-6">
        <div className="card-header">
          <i className="fas fa-tags icon"></i>
          <h2>Categorias</h2>
        </div>
        <Link to="/categories/new" className="btn btn-success">
          <i className="fas fa-plus"></i> <span className="sm-hidden">Nova</span> Categoria
        </Link>
      </div>
      
      <div className="card">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Pesquisar por nome ou descrição..."
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.length > 0 ? (
                filteredCategories.map(category => (
                  <tr key={category._id}>
                    <td>{category.name}</td>
                    <td>{category.description || '-'}</td>
                    <td>
                      <div className="table-actions">
                        <Link 
                          to={`/categories/edit/${category._id}`} 
                          className="btn-icon warning"
                          title="Editar"
                        >
                          <i className="fas fa-edit"></i>
                        </Link>
                        <button 
                          onClick={() => handleDelete(category._id)} 
                          className="btn-icon danger"
                          title="Excluir"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4">
                    Nenhuma categoria encontrada
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;


