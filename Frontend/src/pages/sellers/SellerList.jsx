//Frontend/src/pages/sellers/SellerList.jsx

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSellers, deleteSeller } from '../../services/sellerService';

const SellerList = () => {
  const [sellers, setSellers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSellers = async () => {
      try {
        const sellersData = await getSellers();
        setSellers(sellersData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadSellers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este vendedor?')) {
      try {
        await deleteSeller(id);
        const updatedSellers = await getSellers();
        setSellers(updatedSellers);
      } catch (err) {
        setError(err.message || 'Erro ao excluir vendedor');
      }
    }
  };

  const filteredSellers = sellers.filter(seller => 
    seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (seller.cpf && seller.cpf.includes(searchTerm)) ||
    seller._id.includes(searchTerm) ||
    seller.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-center py-8">Carregando...</div>;
  if (error) return <div className="alert alert-error">{error}</div>;

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-6">
        <div className="card-header">
          <i className="fas fa-user-tie icon"></i>
          <h2>Vendedores</h2>
        </div>
        <Link to="/sellers/new" className="btn btn-success">
          <i className="fas fa-plus"></i> <span className="sm-hidden">Novo</span> Vendedor
        </Link>
      </div>
      
      <div className="card">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Pesquisar por nome, CPF ou email..."
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
                <th>CPF</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredSellers.length > 0 ? (
                filteredSellers.map(seller => (
                  <tr key={seller._id}>
                    <td>{seller.name}</td>
                    <td>
                      {seller.cpf ? seller.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : '-'}
                    </td>
                    <td>{seller.email}</td>
                    <td>{seller.phone || '-'}</td>
                    <td>
                      <div className="table-actions">
                        <Link 
                          to={`/sellers/edit/${seller._id}`} 
                          className="btn-icon warning"
                          title="Editar"
                        >
                          <i className="fas fa-edit"></i>
                        </Link>
                        <button 
                          onClick={() => handleDelete(seller._id)} 
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
                  <td colSpan="5" className="text-center py-4">
                    Nenhum vendedor encontrado
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

export default SellerList;

