import { useState, useEffect } from 'react';
import { fetchApi } from '../hooks/useApi';
import type { Product } from '../types';
import Categories from './Categories';
import ProductCard from './ProductCard';

interface CatalogProps {
  searchQuery?: string;
}

function Catalog({ searchQuery }: CatalogProps) {
  const [items, setItems] = useState<Product[]>([]);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadItems = async (catId: number | null, off: number, append: boolean) => {
    setLoading(true);
    let url = '/items?';
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
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setOffset(0);
    loadItems(categoryId, 0, false);
  }, [categoryId, searchQuery]);

  const handleLoadMore = () => {
    const newOffset = offset + 6;
    setOffset(newOffset);
    loadItems(categoryId, newOffset, true);
  };

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {!searchQuery && <Categories activeId={categoryId} onSelect={setCategoryId} />}
      <div className="row">
        {items.map(item => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
      {loading && <div className="loader">Загрузка...</div>}
      {hasMore && !loading && (
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