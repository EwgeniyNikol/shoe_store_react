export interface Product {
  id: number;
  category: number;
  title: string;
  images: string[];
  price: number;
  sku: string;
  manufacturer: string;
  color: string;
  material: string;
  season: string;
  reason: string;
  sizes: Size[];
}

export interface Size {
  size: string;
  available: boolean;
}

export interface CartItem {
  id: number;
  title: string;
  size: string;
  price: number;
  count: number;
  image: string;
}

export interface Category {
  id: number;
  title: string;
}

export interface OrderData {
  owner: {
    phone: string;
    address: string;
  };
  items: {
    id: number;
    price: number;
    count: number;
  }[];
}

