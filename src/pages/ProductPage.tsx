import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchApi } from '../hooks/useApi';
import { useCart } from '../context/CartContext';
import type { Product } from '../types';

function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError('');
    fetchApi<Product>(`/items/${id}`)
      .then(setProduct)
      .catch(() => setError('Товар не найден'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError('Выберите размер');
      return;
    }
    setError('');
    addItem({
      id: product!.id,
      title: product!.title,
      size: selectedSize,
      price: product!.price,
      count,
    });
    setAdded(true);
  };

  if (loading) return <div className="text-center py-5">Загрузка...</div>;
  if (!product) return <div className="text-center py-5 text-danger">Товар не найден</div>;

  const availableSizes = product.sizes?.filter(s => s.available) || [];

  return (
    <div className="container py-4">
      <section className="catalog-item">
        <h2 className="text-center mb-4">{product.title}</h2>
        <div className="row">
          <div className="col-md-5 text-center mb-3">
            <img
              src={product.images[0]}
              alt={product.title}
              className="img-fluid"
              style={{ maxHeight: '400px', objectFit: 'contain' }}
            />
          </div>
          <div className="col-md-7">
            <table className="table table-bordered table-sm">
              <tbody>
                <tr><td>Артикул</td><td>{product.sku || '—'}</td></tr>
                <tr><td>Производитель</td><td>{product.manufacturer || '—'}</td></tr>
                <tr><td>Цвет</td><td>{product.color || '—'}</td></tr>
                <tr><td>Материалы</td><td>{product.material || '—'}</td></tr>
                <tr><td>Сезон</td><td>{product.season || '—'}</td></tr>
                <tr><td>Повод</td><td>{product.reason || '—'}</td></tr>
              </tbody>
            </table>

            {availableSizes.length === 0 && (
              <p className="text-muted">Нет в наличии</p>
            )}

            {availableSizes.length > 0 && (
              <>
                <p className="mb-1">Размеры в наличии:</p>
                <div className="mb-3">
                  {availableSizes.map(s => (
                    <span
                      key={s.size}
                      className={`catalog-item-size me-1 ${selectedSize === s.size ? 'selected' : ''}`}
                      onClick={() => { setSelectedSize(s.size); setError(''); }}
                    >
                      {s.size}
                    </span>
                  ))}
                </div>

                <div className="d-flex align-items-center gap-2 mb-3">
                  <label className="mb-0">Количество:</label>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    min="1"
                    max="10"
                    value={count}
                    onChange={(e) => setCount(Math.min(10, Math.max(1, parseInt(e.target.value) || 1)))}
                    style={{ width: '70px' }}
                  />
                </div>

                {error && <div className="text-danger mb-2">{error}</div>}

                {added && <div className="text-success mb-2">Товар добавлен в корзину!</div>}

                <div className="d-flex gap-2">
                  <button className="btn btn-danger" onClick={handleAddToCart}>В корзину</button>
                  {added && (
                    <button className="btn btn-outline-success" onClick={() => navigate('/cart')}>Перейти в корзину</button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductPage;