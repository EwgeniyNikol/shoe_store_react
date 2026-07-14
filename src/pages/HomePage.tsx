import Banner from '../components/Banner';
import TopSales from '../components/TopSales';
import Catalog from '../components/Catalog';

function HomePage() {
  return (
    <div className="container">
      <Banner />
      <TopSales />
      <Catalog />
    </div>
  );
}

export default HomePage;