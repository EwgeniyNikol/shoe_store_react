import { createContext, useContext, useReducer, useEffect, useMemo, type ReactNode } from 'react';
import type { CartItem } from '../types';

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD'; payload: CartItem }
  | { type: 'REMOVE'; payload: { id: number; size: string } }
  | { type: 'UPDATE'; payload: { id: number; size: string; count: number } }
  | { type: 'CLEAR' };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find(
        item => item.id === action.payload.id && item.size === action.payload.size
      );
      if (existing) {
        return {
          items: state.items.map(item =>
            item.id === action.payload.id && item.size === action.payload.size
              ? { ...item, count: item.count + action.payload.count }
              : item
          ),
        };
      }
      return { items: [...state.items, action.payload] };
    }
    case 'REMOVE':
      return {
        items: state.items.filter(
          item => !(item.id === action.payload.id && item.size === action.payload.size)
        ),
      };
    case 'UPDATE':
      return {
        items: state.items.map(item =>
          item.id === action.payload.id && item.size === action.payload.size
            ? { ...item, count: Math.max(1, Math.min(10, action.payload.count)) }
            : item
        ),
      };
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
}

const CartContext = createContext<{
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number, size: string) => void;
  updateCount: (id: number, size: string, count: number) => void;
  clearCart: () => void;
  totalCount: number;
  totalPrice: number;
} | null>(null);

function loadCart(): CartItem[] {
  try {
    const data = localStorage.getItem('cart');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: loadCart() });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (item: CartItem) => dispatch({ type: 'ADD', payload: item });
  const removeItem = (id: number, size: string) => dispatch({ type: 'REMOVE', payload: { id, size } });
  const updateCount = (id: number, size: string, count: number) => dispatch({ type: 'UPDATE', payload: { id, size, count } });
  const clearCart = () => dispatch({ type: 'CLEAR' });

  const totalCount = useMemo(
    () => state.items.reduce((sum, item) => sum + item.count, 0),
    [state.items]
  );

  const totalPrice = useMemo(
    () => state.items.reduce((sum, item) => sum + item.price * item.count, 0),
    [state.items]
  );

  return (
    <CartContext.Provider value={{ items: state.items, addItem, removeItem, updateCount, clearCart, totalCount, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}