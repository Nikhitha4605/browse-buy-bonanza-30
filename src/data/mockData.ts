
import { Product, Order } from '@/types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Headphones',
    description: 'Wireless noise-cancelling headphones with premium sound quality and 24-hour battery life.',
    price: 199.99,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3300&q=80',
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smart Watch',
    description: 'Health and fitness tracker with heart rate monitoring, GPS, and workout tracking capabilities.',
    price: 249.99,
    imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3264&q=80',
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Leather Backpack',
    description: 'Handcrafted genuine leather backpack with multiple compartments and laptop sleeve.',
    price: 129.99,
    imageUrl: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3328&q=80',
    category: 'accessories',
    inStock: true
  },
  {
    id: '4',
    name: 'Mechanical Keyboard',
    description: 'RGB backlit mechanical gaming keyboard with customizable key switches.',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3276&q=80',
    category: 'electronics',
    inStock: true
  },
  {
    id: '5',
    name: 'Running Shoes',
    description: 'Lightweight, cushioned running shoes designed for comfort and performance.',
    price: 119.99,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3270&q=80',
    category: 'clothing',
    inStock: true
  },
  {
    id: '6',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with thermal carafe and auto-brew functionality.',
    price: 79.99,
    imageUrl: 'https://images.unsplash.com/photo-1572119865084-43c285814d63?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3270&q=80',
    category: 'home',
    inStock: true
  },
  {
    id: '7',
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with long battery life and precision tracking.',
    price: 39.99,
    imageUrl: 'https://images.unsplash.com/photo-1605773527852-c546a8584ea3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3274&q=80',
    category: 'electronics',
    inStock: true
  },
  {
    id: '8',
    name: 'Yoga Mat',
    description: 'Non-slip, eco-friendly yoga mat with alignment guides for proper positioning.',
    price: 49.99,
    imageUrl: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3270&q=80',
    category: 'fitness',
    inStock: true
  },
  {
    id: '9',
    name: 'Desk Lamp',
    description: 'Adjustable LED desk lamp with multiple brightness levels and color temperatures.',
    price: 59.99,
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3266&q=80',
    category: 'home',
    inStock: true
  },
  {
    id: '10',
    name: 'Water Bottle',
    description: 'Insulated stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12 hours.',
    price: 29.99,
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80',
    category: 'accessories',
    inStock: true
  },
  {
    id: '11',
    name: 'Smart Speaker',
    description: 'Voice-controlled smart speaker with built-in virtual assistant and premium sound quality.',
    price: 149.99,
    imageUrl: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3312&q=80',
    category: 'electronics',
    inStock: false
  },
  {
    id: '12',
    name: 'Denim Jacket',
    description: 'Classic denim jacket with a modern fit, perfect for layering in any season.',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3270&q=80',
    category: 'clothing',
    inStock: true
  }
];

export const orders: Order[] = [
  {
    id: '1',
    userId: '1',
    items: [
      {
        productId: '1',
        name: 'Premium Headphones',
        price: 199.99,
        quantity: 1
      },
      {
        productId: '7',
        name: 'Wireless Mouse',
        price: 39.99,
        quantity: 2
      }
    ],
    total: 279.97,
    status: 'delivered',
    shippingAddress: {
      fullName: 'Regular User',
      addressLine1: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      postalCode: '12345',
      country: 'USA'
    },
    paymentMethod: 'Credit Card',
    createdAt: '2023-07-15T10:30:00Z'
  },
  {
    id: '2',
    userId: '1',
    items: [
      {
        productId: '5',
        name: 'Running Shoes',
        price: 119.99,
        quantity: 1
      }
    ],
    total: 119.99,
    status: 'shipped',
    shippingAddress: {
      fullName: 'Regular User',
      addressLine1: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      postalCode: '12345',
      country: 'USA'
    },
    paymentMethod: 'PayPal',
    createdAt: '2023-08-22T14:45:00Z'
  },
  {
    id: '3',
    userId: '2',
    items: [
      {
        productId: '3',
        name: 'Leather Backpack',
        price: 129.99,
        quantity: 1
      },
      {
        productId: '10',
        name: 'Water Bottle',
        price: 29.99,
        quantity: 1
      }
    ],
    total: 159.98,
    status: 'processing',
    shippingAddress: {
      fullName: 'Admin User',
      addressLine1: '456 Admin Ave',
      city: 'Adminville',
      state: 'NY',
      postalCode: '54321',
      country: 'USA'
    },
    paymentMethod: 'Credit Card',
    createdAt: '2023-09-05T09:15:00Z'
  }
];

// Get the unique categories from products
export const categories = Array.from(
  new Set(products.map(product => product.category))
);
