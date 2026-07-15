import { useState, useEffect, useCallback } from 'react';
import { fetchApi } from '../hooks/useApi';
import type { Product } from '../types';
import Categories from './Categories';
import ProductCard from './ProductCard';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';

interface CatalogProps {
  searchQuery?: string;
}

function Catalog({ searchQuery }: CatalogProps) {
  const [items, setItems] = useState<Product[]>([]);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadItems = useCallback(async (catId: number | null, off: number, append: boolean) => {
    setLoading(true);
    setError('');
    let url = `/items?`;
    if (catId !== null) url += `categoryId=${catId}&`;
    if (searchQuery) url += `q=${encodeURIComponent(searchQuery)}&`;
    url += `offset=${off}`;

    try {
      const data = await fetchApi<Product[]>(url);
      if (append) {
        setItems(prev => [...prev, ...data]);
      } else {
        setItems(data);
      }
      setHasMore(data.length === 6);
    } catch {
      setError('Не удалось загрузить каталог');
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  const handleCategorySelect = useCallback((catId: number | null) => {
    setCategoryId(catId);
    setOffset(0);
    loadItems(catId, 0, false);
  }, [loadItems]);

  const handleLoadMore = useCallback(() => {
    const newOffset = offset + 6;
    setOffset(newOffset);
    loadItems(categoryId, newOffset, true);
  }, [offset, categoryId, loadItems]);

  useEffect(() => {
    setOffset(0);
    loadItems(categoryId, 0, false);
  }, [categoryId, searchQuery, loadItems]);

  return (
    <section className="catalog my-3">
      <h2 className="text-center">Каталог</h2>
      {!searchQuery && <Categories activeId={categoryId} onSelect={handleCategorySelect} />}
      {error && <ErrorMessage message={error} onRetry={() => loadItems(categoryId, offset, false)} />}
      <div className="row">
        {items.map(item => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
      {loading && <Loader />}
      {hasMore && !loading && !error && (
        <div className="text-center">
          <button className="btn btn-outline-primary" onClick={handleLoadMore}>
            Загрузить ещё
          </button>
        </div>
      )}
    </section>
  );
}

export default Catalog;