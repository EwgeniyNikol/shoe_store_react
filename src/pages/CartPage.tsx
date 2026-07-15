import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItemRow from '../components/CartItemRow';
import CartItemCard from '../components/CartItemCard';

function CartPage() {
  const { items, removeItem, updateCount, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [phone, setPhone] = useState('+7');
  const [address, setAddress] = useState('');
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderError, setOrderError] = useState('');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!val.startsWith('+7')) return;
    const rest = val.slice(2).replace(/\D/g, '').slice(0, 10);
    setPhone('+7' + rest);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value.slice(0, 100));
  };

  const handleOrder = async () => {
    const phoneClean = phone.replace(/\D/g, '');
    if (!phone.startsWith('+7') || phoneClean.length !== 11) {
      setOrderError('Телефон должен начинаться с +7 и содержать 10 цифр');
      return;
    }
    if (address.trim().length < 5) {
      setOrderError('Введите полный адрес доставки');
      return;
    }
    setOrderLoading(true);
    setOrderError('');
    try {
      const res = await fetch('https://shoe-store-18si.onrender.com/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          owner: { phone: phone.trim(), address: address.trim() },
          items: items.map(item => ({ id: item.id, price: item.price, count: item.count })),
        }),
      });
      if (!res.ok) throw new Error('Ошибка оформления');
      clearCart();
      setOrderSuccess(true);
    } catch {
      setOrderError('Не удалось оформить заказ');
    } finally {
      setOrderLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="container text-center py-5">
        <h2 className="text-success">Заказ оформлен!</h2>
        <p>Спасибо за покупку. Мы свяжемся с вами.</p>
        <button className="btn btn-outline-primary" onClick={() => navigate('/')}>На главную</button>
      </div>
    );
  }

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
            <tr><th></th><th>Товар</th><th>Размер</th><th>Цена</th><th>Кол-во</th><th>Сумма</th><th></th></tr>
          </thead>
          <tbody>
            {items.map(item => (
              <CartItemRow key={`${item.id}-${item.size}`} item={item} onUpdate={updateCount} onRemove={removeItem} />
            ))}
          </tbody>
        </table>
      ) : (
        <div className="row">
          {items.map(item => (
            <CartItemCard key={`${item.id}-${item.size}`} item={item} onUpdate={updateCount} onRemove={removeItem} />
          ))}
        </div>
      )}

      <div className="text-end mt-3">
        <h4>Итого: {totalPrice.toLocaleString()} руб.</h4>
      </div>

      <div className="card mt-4 p-4">
        <h5>Оформление заказа</h5>
        <div className="row g-3">
          <div className="col-md-6">
            <input
              className="form-control"
              placeholder="+79000000000"
              value={phone}
              onChange={handlePhoneChange}
            />
          </div>
          <div className="col-md-6">
            <input
              className="form-control"
              placeholder="Адрес доставки"
              value={address}
              onChange={handleAddressChange}
              maxLength={100}
            />
          </div>
        </div>
        {orderError && <div className="text-danger mt-2">{orderError}</div>}
        <button className="btn btn-success mt-3" onClick={handleOrder} disabled={orderLoading}>
          {orderLoading ? 'Оформление...' : 'Оформить заказ'}
        </button>
      </div>
    </div>
  );
}

export default CartPage;