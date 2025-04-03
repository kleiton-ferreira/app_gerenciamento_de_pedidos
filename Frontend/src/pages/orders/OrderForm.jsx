//frontend/src/pages/orders/OrderForm.jsx

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  getOrderById, 
  saveOrder 
} from '../../services/orderService';
import { 
  getClients,
  getCategories,
  getSellers
} from '../../services';

const OrderForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState({
    clientId: '',
    categoryId: '',
    sellerId: '',
    amount: 0,
    description: ''
  });
  const [clients, setClients] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        const [clientsData, categoriesData, sellersData] = await Promise.all([
          getClients(),
          getCategories(),
          getSellers()
        ]);
        
        setClients(clientsData);
        setCategories(categoriesData);
        setSellers(sellersData);
        
        if (id) {
          const existingOrder = await getOrderById(id);
          setOrder({
            _id: existingOrder._id,
            clientId: existingOrder.client?._id || '',
            categoryId: existingOrder.category?._id || '',
            sellerId: existingOrder.seller?._id || '',
            amount: existingOrder.amount || 0,
            description: existingOrder.description || ''
          });
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({
      ...order,
      [name]: name === 'amount' ? parseFloat(value) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await saveOrder(order);
      navigate('/orders');
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
        <i className="fas fa-shopping-cart icon"></i>
        <h2>{id ? 'Editar Pedido' : 'Novo Pedido'}</h2>
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
            <label className="form-label">Cliente *</label>
            <select
              name="clientId"
              className="form-control"
              value={order.clientId}
              onChange={handleChange}
              required
              disabled={loading}
            >
              <option value="">Selecione um cliente</option>
              {clients.map(client => (
                <option key={client._id} value={client._id}>{client.name}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Categoria *</label>
            <select
              name="categoryId"
              className="form-control"
              value={order.categoryId}
              onChange={handleChange}
              required
              disabled={loading}
            >
              <option value="">Selecione uma categoria</option>
              {categories.map(category => (
                <option key={category._id} value={category._id}>{category.name}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Vendedor *</label>
            <select
              name="sellerId"
              className="form-control"
              value={order.sellerId}
              onChange={handleChange}
              required
              disabled={loading}
            >
              <option value="">Selecione um vendedor</option>
              {sellers.map(seller => (
                <option key={seller._id} value={seller._id}>{seller.name}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Valor *</label>
            <input
              type="number"
              name="amount"
              className="form-control"
              value={order.amount}
              onChange={handleChange}
              step="0.01"
              min="0"
              required
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Descrição</label>
            <textarea
              name="description"
              className="form-control"
              value={order.description}
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
              onClick={() => navigate('/orders')}
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

export default OrderForm;
