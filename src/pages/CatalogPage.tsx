import { useSearchParams } from 'react-router-dom';
import Catalog from '../components/Catalog';

function CatalogPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || undefined;

  return (
    <div className="container">
      <Catalog searchQuery={query} />
    </div>
  );
}

export default CatalogPage;