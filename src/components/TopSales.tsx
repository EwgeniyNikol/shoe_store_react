import { useState, useEffect } from 'react';
import { fetchApi } from '../hooks/useApi';
import type { Product } from '../types';
import ProductCard from './ProductCard';

function TopSales() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApi<Product[]>('/top-sales')
      .then(setItems)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loader">Загрузка...</div>;
  if (items.length === 0) return null;

  return (
    <section className="top-sales">
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