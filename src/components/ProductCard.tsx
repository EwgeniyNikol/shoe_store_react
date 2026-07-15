import { memo } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { getImageUrl } from '../hooks/useApi';

interface ProductCardProps {
  product: Product;
}

const ProductCard = memo(function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="col-4 mb-4">
      <div className="card catalog-item h-100">
        <img src={getImageUrl(product.images[0])} className="card-img-top" alt={product.title} style={{ height: '250px', objectFit: 'contain', padding: '10px', background: '#fff' }} />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text mt-auto">{product.price.toLocaleString()} руб.</p>
          <div>
            <Link to={`/catalog/${product.id}`} className="btn btn-outline-primary">Заказать</Link>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProductCard;