import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';

function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { totalCount } = useCart();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSearchOpen(false);
    setSearchText('');
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearchToggle = () => {
    if (!searchOpen) {
      setSearchOpen(true);
    } else if (searchText.trim()) {
      navigate(`/catalog?q=${encodeURIComponent(searchText.trim())}`);
    } else {
      setSearchOpen(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchText.trim()) {
      navigate(`/catalog?q=${encodeURIComponent(searchText.trim())}`);
    }
  };

  return (
    <header className="container py-3">
      <div className="row align-items-center">
        <div className="col-auto">
          <Link className="navbar-brand" to="/">
            <img src="/img/header-logo.png" alt="Bosa Noga" height="40" />
          </Link>
        </div>
        <div className="col">
          <ul className="nav">
            <li className="nav-item"><Link className="nav-link" to="/">Главная</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/catalog">Каталог</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">О магазине</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contacts">Контакты</Link></li>
          </ul>
        </div>
        <div className="col-auto d-flex align-items-center gap-3">
          {searchOpen && (
            <form className="d-flex" onSubmit={handleSearchSubmit}>
              <input
                ref={inputRef}
                className="form-control form-control-sm"
                placeholder="Поиск"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: '200px' }}
              />
            </form>
          )}
          <span role="button" onClick={handleSearchToggle} style={{ cursor: 'pointer', opacity: 0.6 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <Link to="/cart" className="text-decoration-none d-inline-flex align-items-center gap-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            Корзина
            {totalCount > 0 && <span className="badge bg-danger rounded-pill">{totalCount}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;