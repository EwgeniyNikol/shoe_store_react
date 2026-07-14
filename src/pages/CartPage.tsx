import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function CartPage() {
  const { items, removeItem, totalPrice } = useCart();
  const navigate = useNavigate();
  const [view, setView] = useState<'list' | 'grid'>('list');

  if (items.length === 0) {
    return (
      <div className="container text-center py-5">
        <h2>Корзина пуста</h2>
        <button className="btn btn-outline-primary mt-3" onClick={() => navigate('/')}>На главную</button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Корзина</h2>
        <div className="btn-group">
          <button className={`btn btn-sm ${view === 'list' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setView('list')}>📋 Список</button>
          <button className={`btn btn-sm ${view === 'grid' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setView('grid')}>🔲 Плитка</button>
        </div>
      </div>

      {view === 'list' ? (
        <table className="table table-bordered align-middle">
          <thead>
            <tr>
              <th></th>
              <th>Товар</th>
              <th>Размер</th>
              <th>Цена</th>
              <th>Кол-во</th>
              <th>Сумма</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={`${item.id}-${item.size}`}>
                <td><img src={item.image} alt={item.title} height="50" /></td>
                <td>{item.title}</td>
                <td>{item.size}</td>
                <td>{item.price.toLocaleString()} руб.</td>
                <td>{item.count}</td>
                <td>{(item.price * item.count).toLocaleString()} руб.</td>
                <td>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => removeItem(item.id, item.size)}>✕</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="row">
          {items.map(item => (
            <div key={`${item.id}-${item.size}`} className="col-md-4 mb-3">
              <div className="card h-100">
                <img src={item.image} className="card-img-top" alt={item.title} style={{ height: '180px', objectFit: 'contain', padding: '10px' }} />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">Размер: {item.size}</p>
                  <p className="card-text">{item.price.toLocaleString()} руб. × {item.count}</p>
                  <p className="card-text fw-bold">{(item.price * item.count).toLocaleString()} руб.</p>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => removeItem(item.id, item.size)}>Удалить</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-end mt-3">
        <h4>Итого: {totalPrice.toLocaleString()} руб.</h4>
        <button className="btn btn-success mt-2">Оформить заказ</button>
      </div>
    </div>
  );
}

export default CartPage;