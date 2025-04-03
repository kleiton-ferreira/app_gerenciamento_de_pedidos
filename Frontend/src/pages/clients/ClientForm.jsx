//frontend/src/pages/client/ClientForm.jsx

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getClientById, saveClient } from '../../services/clientService';

const ClientForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    cpf: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      const loadClient = async () => {
        try {
          const existingClient = await getClientById(id);
          setClient({
            _id: existingClient._id,
            name: existingClient.name,
            email: existingClient.email,
            phone: existingClient.phone || '',
            address: existingClient.address || '',
            cpf: existingClient.cpf
          });
        } catch (err) {
          navigate('/clients', { replace: true });
        }
      };
      loadClient();
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient({
      ...client,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    try {
      await saveClient(client);
      navigate('/clients');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="card-header">
        <i className="fas fa-users icon"></i>
        <h2>{id ? 'Editar Cliente' : 'Novo Cliente'}</h2>
      </div>
      
      <div className="card">
        {error && (
          <div className="alert alert-error mb-4">
            <i className="fas fa-exclamation-circle mr-2"></i>
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
                value={client.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">CPF *</label>
              <input
                type="text"
                name="cpf"
                className="form-control"
                value={client.cpf}
                onChange={handleChange}
                maxLength="14"
                placeholder="Somente números"
                required
                disabled={!!id}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Email *</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={client.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Telefone</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                value={client.phone}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="form-group mt-4">
            <label className="form-label">Endereço</label>
            <textarea
              name="address"
              className="form-control"
              value={client.address}
              onChange={handleChange}
              rows="3"
            />
          </div>
          
          <div className="form-actions mt-6">
            <button 
              type="submit" 
              className="btn btn-success"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Salvando...
                </>
              ) : (
                <>
                  <i className="fas fa-save mr-2"></i>
                  Salvar
                </>
              )}
            </button>
            
            <button 
              type="button" 
              className="btn btn-outline"
              onClick={() => navigate('/clients')}
              disabled={isSubmitting}
            >
              <i className="fas fa-times mr-2"></i>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientForm;
