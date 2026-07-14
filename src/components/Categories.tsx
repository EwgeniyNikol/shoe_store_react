import { useState, useEffect } from 'react';
import { fetchApi } from '../hooks/useApi';
import type { Category } from '../types';

interface CategoriesProps {
  activeId: number | null;
  onSelect: (id: number | null) => void;
}

function Categories({ activeId, onSelect }: CategoriesProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchApi<Category[]>('/categories').then(setCategories);
  }, []);

  return (
    <ul className="catalog-categories nav justify-content-center">
      <li className="nav-item">
        <span
          className={`nav-link ${activeId === null ? 'active' : ''}`}
          onClick={() => onSelect(null)}
          style={{ cursor: 'pointer' }}
        >
          Все
        </span>
      </li>
      {categories.map(cat => (
        <li className="nav-item" key={cat.id}>
          <span
            className={`nav-link ${activeId === cat.id ? 'active' : ''}`}
            onClick={() => onSelect(cat.id)}
            style={{ cursor: 'pointer' }}
          >
            {cat.title}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default Categories;