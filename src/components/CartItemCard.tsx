import type { CartItem } from '../types';

interface CartItemCardProps {
  item: CartItem;
  onUpdate: (id: number, size: string, count: number) => void;
  onRemove: (id: number, size: string) => void;
}

function CartItemCard({ item, onUpdate, onRemove }: CartItemCardProps) {
  return (
    <div className="col-md-4 mb-3">
      <div className="card h-100">
        <img src={item.image} className="card-img-top" alt={item.title} style={{ height: '180px', objectFit: 'contain', padding: '10px' }} />
        <div className="card-body">
          <h5 className="card-title">{item.title}</h5>
          <p className="card-text">Размер: {item.size}</p>
          <p className="card-text">{item.price.toLocaleString()} руб.</p>
          <div className="d-flex align-items-center gap-1 mb-2">
            <button className="btn btn-sm btn-outline-secondary px-1 py-0" onClick={() => onUpdate(item.id, item.size, item.count - 1)}>−</button>
            <span className="mx-1">{item.count}</span>
            <button className="btn btn-sm btn-outline-secondary px-1 py-0" onClick={() => onUpdate(item.id, item.size, item.count + 1)}>+</button>
          </div>
          <p className="card-text fw-bold">{(item.price * item.count).toLocaleString()} руб.</p>
          <button className="btn btn-outline-danger btn-sm px-1 py-0" onClick={() => onRemove(item.id, item.size)} title="Удалить">🗑</button>
        </div>
      </div>
    </div>
  );
}

export default CartItemCard;