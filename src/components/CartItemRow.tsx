import type { CartItem } from '../types';

interface CartItemRowProps {
  item: CartItem;
  onUpdate: (id: number, size: string, count: number) => void;
  onRemove: (id: number, size: string) => void;
}

function CartItemRow({ item, onUpdate, onRemove }: CartItemRowProps) {
  return (
    <tr>
      <td><img src={item.image} alt={item.title} height="50" /></td>
      <td>{item.title}</td>
      <td>{item.size}</td>
      <td>{item.price.toLocaleString()} руб.</td>
      <td>
        <div className="d-flex align-items-center gap-1">
          <button className="btn btn-sm btn-outline-secondary px-1 py-0" onClick={() => onUpdate(item.id, item.size, item.count - 1)}>−</button>
          <span className="mx-1">{item.count}</span>
          <button className="btn btn-sm btn-outline-secondary px-1 py-0" onClick={() => onUpdate(item.id, item.size, item.count + 1)}>+</button>
        </div>
      </td>
      <td>{(item.price * item.count).toLocaleString()} руб.</td>
      <td><button className="btn btn-outline-danger btn-sm px-1 py-0" onClick={() => onRemove(item.id, item.size)} title="Удалить">🗑</button></td>
    </tr>
  );
}

export default CartItemRow;