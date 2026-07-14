import { useCart } from '../context/CartContext';

function CartPage() {
  const { items, removeItem, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="container text-center">
        <h2>Корзина пуста</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Корзина</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Товар</th>
            <th>Размер</th>
            <th>Цена</th>
            <th>Кол-во</th>
            <th>Сумма</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={`${item.id}-${item.size}`}>
              <td>{i + 1}</td>
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
      <div className="text-end">
        <h4>Итого: {totalPrice.toLocaleString()} руб.</h4>
      </div>
    </div>
  );
}

export default CartPage;