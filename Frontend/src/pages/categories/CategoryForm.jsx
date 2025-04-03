//frontend/src/pages/categories/CategoryForm.jsx

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCategoryById, saveCategory } from '../../services/categoryService';

const CategoryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState({
    name: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      const loadCategory = async () => {
        try {
          setLoading(true);
          const existingCategory = await getCategoryById(id);
          setCategory({
            _id: existingCategory._id,
            name: existingCategory.name,
            description: existingCategory.description || ''
          });
        } catch (err) {
          setError(err.message);
          navigate('/categories');
        } finally {
          setLoading(false);
        }
      };
      loadCategory();
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await saveCategory(category);
      navigate('/categories');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && id) return <div className="text-center py-8">Carregando...</div>;

  return (
    <div className="container">
      <div className="card-header">
        <i className="fas fa-tags icon"></i>
        <h2>{id ? 'Editar Categoria' : 'Nova Categoria'}</h2>
      </div>
      
      <div className="card">
        {error && (
          <div className="alert alert-error mb-4">
            <i className="fas fa-exclamation-circle"></i>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Nome *</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={category.name}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Descrição</label>
            <textarea
              name="description"
              className="form-control"
              value={category.description}
              onChange={handleChange}
              rows="3"
              disabled={loading}
            />
          </div>
          <div className="form-actions">
            <button 
              type="submit" 
              className="btn btn-success"
              disabled={loading}
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Salvando...
                </>
              ) : (
                <>
                  <i className="fas fa-save"></i> Salvar
                </>
              )}
            </button>
            <button 
              type="button" 
              className="btn btn-outline"
              onClick={() => navigate('/categories')}
              disabled={loading}
            >
              <i className="fas fa-times"></i> Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;