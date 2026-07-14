import { Link } from 'react-router-dom';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="col-4 mb-4">
      <div className="card catalog-item-card h-100">
        <img src={product.images[0]} className="card-img-top" alt={product.title} style={{ height: '250px', objectFit: 'contain', padding: '10px', background: '#fff' }} />
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
}

export default ProductCard;