import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { CartProvider } from './context/CartContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <BrowserRouter basename={import.meta.env.PROD ? '/shoe_store_react' : undefined}>
        <App />
      </BrowserRouter>
    </CartProvider>
  </StrictMode>,
);