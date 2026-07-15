import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchApi, getImageUrl } from '../hooks/useApi';
import { useCart } from '../context/CartContext';
import type { Product } from '../types';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

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

  const loadProduct = () => {
    setLoading(true);
    setError('');
    fetchApi<Product>(`/items/${id}`)
      .then(setProduct)
      .catch(() => setError('Товар не найден'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProduct();
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
      image: getImageUrl(product!.images[0]),
    });
    setAdded(true);
  };

  if (loading) return <Loader />;
  if (error && !product) return <ErrorMessage message={error} onRetry={loadProduct} />;

  const availableSizes = product!.sizes?.filter(s => s.available) || [];

  return (
    <div className="container py-3">
      <h2 className="text-center mb-3">{product!.title}</h2>
      <div className="row g-3">
        <div className="col-md-5 text-center">
          <img
            src={getImageUrl(product!.images[0])}
            alt={product!.title}
            className="img-fluid"
            style={{ maxHeight: '280px', objectFit: 'contain' }}
          />
        </div>
        <div className="col-md-7">
          <table className="table table-bordered table-sm mb-2">
            <tbody>
              <tr><td>Артикул</td><td>{product!.sku || '—'}</td></tr>
              <tr><td>Производитель</td><td>{product!.manufacturer || '—'}</td></tr>
              <tr><td>Цвет</td><td>{product!.color || '—'}</td></tr>
              <tr><td>Материалы</td><td>{product!.material || '—'}</td></tr>
              <tr><td>Сезон</td><td>{product!.season || '—'}</td></tr>
              <tr><td>Повод</td><td>{product!.reason || '—'}</td></tr>
            </tbody>
          </table>

          {availableSizes.length === 0 && (
            <p className="text-muted">Нет в наличии</p>
          )}

          {availableSizes.length > 0 && (
            <>
              <p className="mb-1">Размеры в наличии:</p>
              <div className="d-flex flex-wrap gap-1 mb-2">
                {availableSizes.map(s => (
                  <span
                    key={s.size}
                    className={`catalog-item__size ${selectedSize === s.size ? 'catalog-item__size_active' : ''}`}
                    onClick={() => { setSelectedSize(s.size); setError(''); }}
                  >
                    {s.size}
                  </span>
                ))}
              </div>

              <div className="d-flex align-items-center gap-2 mb-2">
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

              {error && <div className="text-danger mb-1">{error}</div>}
              {added && <div className="text-success mb-1">Товар добавлен в корзину!</div>}

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
    </div>
  );
}

export default ProductPage;