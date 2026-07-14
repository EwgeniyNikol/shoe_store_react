import { Link } from 'react-router-dom';
import ContactInfo from './ContactInfo';

function Footer() {
  return (
    <footer className="container bg-light footer py-4">
      <div className="row">
        <div className="col">
          <section>
            <h5>Информация</h5>
            <ul className="nav flex-column">
              <li className="nav-item"><Link to="/about" className="nav-link">О магазине</Link></li>
              <li className="nav-item"><Link to="/catalog" className="nav-link">Каталог</Link></li>
              <li className="nav-item"><Link to="/contacts" className="nav-link">Контакты</Link></li>
            </ul>
          </section>
        </div>
        <div className="col">
          <section>
            <h5>Принимаем к оплате</h5>
            <div className="d-flex gap-2">
              <span className="badge bg-primary">Visa</span>
              <span className="badge bg-danger">Mastercard</span>
              <span className="badge bg-success">Мир</span>
              <span className="badge bg-warning text-dark">Сбер</span>
            </div>
          </section>
          <section>
            <div className="footer-copyright mt-2">
              2009-2025 © BosaNoga.ru
            </div>
          </section>
        </div>
        <div className="col">
          <section>
            <h5>Контакты</h5>
            <ContactInfo />
          </section>
        </div>
      </div>
    </footer>
  );
}

export default Footer;