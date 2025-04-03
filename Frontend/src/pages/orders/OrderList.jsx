//Frontend/src/pages/orders/OrderList.jsx

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOrders, deleteOrder } from '../../services/orderService';
import { formatDate } from '../../utils/formatDate';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const ordersData = await getOrders();
        setOrders(ordersData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este pedido?')) {
      try {
        await deleteOrder(id);
        const updatedOrders = await getOrders();
        setOrders(updatedOrders);
      } catch (err) {
        setError(err.message || 'Erro ao excluir pedido');
      }
    }
  };

  const filteredOrders = orders.filter(order => 
    (order.client?.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    order._id.includes(searchTerm) ||
    (order.category?.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (order.description && order.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
    order.amount?.toString().includes(searchTerm) ||
    (order.seller?.name?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) return <div className="text-center py-8">Carregando...</div>;
  if (error) return <div className="alert alert-error">{error}</div>;

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-6">
        <div className="card-header">
          <i className="fas fa-shopping-cart icon"></i>
          <h2>Pedidos</h2>
        </div>
        <Link to="/orders/new" className="btn btn-success">
          <i className="fas fa-plus"></i> <span className="sm-hidden">Novo</span> Pedido
        </Link>
      </div>
      
      <div className="card">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Pesquisar por cliente, categoria, descrição, valor ou vendedor..."
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Endereço</th>
                <th>Categoria</th>
                <th>Descrição</th>
                <th>Vendedor</th>
                <th>Valor</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map(order => (
                  <tr key={order._id}>
                    <td className="text-sm">{order._id.substring(0, 6)}...</td>
                    <td>{order.client?.name || '-'}</td>
                    <td className="text-sm">
                      {order.client?.address || '-'}
                    </td>
                    <td>{order.category?.name || '-'}</td>
                    <td className="text-sm">{order.description || '-'}</td>
                    <td>{order.seller?.name || '-'}</td>
                    <td>R$ {order.amount?.toFixed(2).replace('.', ',')}</td>
                    <td>
                      {order.createdAt ? formatDate(order.createdAt) : '-'}
                    </td>
                    <td>
                      <div className="table-actions">
                        <Link 
                          to={`/orders/edit/${order._id}`} 
                          className="btn-icon warning"
                          title="Editar"
                        >
                          <i className="fas fa-edit"></i>
                        </Link>
                        <button 
                          onClick={() => handleDelete(order._id)} 
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
                  <td colSpan="9" className="text-center py-4">
                    Nenhum pedido encontrado
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

export default OrderList;