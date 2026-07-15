import { useState, useEffect } from 'react';
import { fetchApi } from '../hooks/useApi';
import type { Product } from '../types';
import ProductCard from './ProductCard';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';

function TopSales() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadTopSales = () => {
    setLoading(true);
    setError('');
    fetchApi<Product[]>('/top-sales')
      .then(setItems)
      .catch(() => setError('Не удалось загрузить хиты продаж'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadTopSales();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} onRetry={loadTopSales} />;
  if (items.length === 0) return null;

  return (
    <section className="top-sales my-3">
      <h2 className="text-center">Хиты продаж!</h2>
      <div className="row">
        {items.map(item => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </section>
  );
}

export default TopSales;