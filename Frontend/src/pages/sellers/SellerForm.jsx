//frontend/src/pages/sellers/SellerForm.jsx

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSellerById, saveSeller } from '../../services/sellerService';

const SellerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [seller, setSeller] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      const loadSeller = async () => {
        try {
          setLoading(true);
          const existingSeller = await getSellerById(id);
          setSeller({
            _id: existingSeller._id,
            name: existingSeller.name,
            email: existingSeller.email,
            phone: existingSeller.phone || '',
            cpf: existingSeller.cpf
          });
        } catch (err) {
          setError('Vendedor não encontrado');
          navigate('/sellers');
        } finally {
          setLoading(false);
        }
      };
      loadSeller();
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSeller({
      ...seller,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await saveSeller(seller);
      navigate('/sellers');
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
        <i className="fas fa-user-tie icon"></i>
        <h2>{id ? 'Editar Vendedor' : 'Novo Vendedor'}</h2>
      </div>
      
      <div className="card">
        {error && (
          <div className="alert alert-error mb-4">
            <i className="fas fa-exclamation-circle"></i>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">Nome *</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={seller.name}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">CPF *</label>
              <input
                type="text"
                name="cpf"
                className="form-control"
                value={seller.cpf}
                onChange={handleChange}
                maxLength="14"
                placeholder="Somente números"
                required
                disabled={!!id || loading}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Email *</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={seller.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Telefone</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                value={seller.phone}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>
          
          <div className="form-actions mt-6">
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
              onClick={() => navigate('/sellers')}
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

export default SellerForm;