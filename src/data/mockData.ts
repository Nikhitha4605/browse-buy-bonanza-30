import { Product, Order } from '@/types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'Stylish Sneakers',
    description: 'Comfortable and stylish sneakers perfect for everyday wear and casual outings.',
    price: 2499,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3270&q=80',
    category: 'footwear',
    inStock: true,
    color: 'white',
    type: 'footwear'
  },
  {
    id: '2',
    name: 'Leather Backpack',
    description: 'Handcrafted genuine leather backpack with multiple compartments and laptop sleeve.',
    price: 3200,
    imageUrl: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3328&q=80',
    category: 'accessories',
    inStock: true,
    color: 'brown',
    type: 'accessories'
  },
  {
    id: '3',
    name: 'Smart Watch',
    description: 'Health and fitness tracker with heart rate monitoring, GPS, and workout tracking capabilities.',
    price: 5999,
    imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3264&q=80',
    category: 'electronics',
    inStock: true,
    color: 'black',
    type: 'electronics'
  },
  {
    id: '4',
    name: 'Cotton T-Shirt',
    description: 'Premium cotton t-shirt with a comfortable fit and stylish design.',
    price: 799,
    imageUrl: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80',
    category: 'clothing',
    inStock: true,
    color: 'blue',
    type: 'clothing'
  },
  {
    id: '5',
    name: 'Noise Cancelling Headphones',
    description: 'Wireless noise-cancelling headphones with premium sound quality and 24-hour battery life.',
    price: 8499,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3300&q=80',
    category: 'electronics',
    inStock: true,
    color: 'silver',
    type: 'electronics'
  },
  {
    id: '6',
    name: 'Denim Jeans',
    description: 'Classic denim jeans with a modern fit, perfect for casual wear.',
    price: 1999,
    imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3326&q=80',
    category: 'clothing',
    inStock: true,
    color: 'blue',
    type: 'clothing'
  },
  {
    id: '7',
    name: 'Wooden Desk Organizer',
    description: 'Elegant wooden desk organizer with multiple compartments for stationery and accessories.',
    price: 1499,
    imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
    category: 'home',
    inStock: true,
    color: 'brown',
    type: 'home'
  },
  {
    id: '8',
    name: 'Yoga Mat',
    description: 'Non-slip, eco-friendly yoga mat with alignment guides for proper positioning.',
    price: 1299,
    imageUrl: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3270&q=80',
    category: 'fitness',
    inStock: true,
    color: 'green',
    type: 'fitness'
  },
  {
    id: '9',
    name: 'LED Desk Lamp',
    description: 'Adjustable LED desk lamp with multiple brightness levels and color temperatures.',
    price: 1799,
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3266&q=80',
    category: 'home',
    inStock: true,
    color: 'black',
    type: 'home'
  },
  {
    id: '10',
    name: 'Stainless Steel Water Bottle',
    description: 'Insulated stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12 hours.',
    price: 899,
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80',
    category: 'accessories',
    inStock: true,
    color: 'silver',
    type: 'accessories'
  },
  {
    id: '11',
    name: 'Bluetooth Speaker',
    description: 'Portable Bluetooth speaker with rich sound quality and 10-hour battery life.',
    price: 2499,
    imageUrl: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3312&q=80',
    category: 'electronics',
    inStock: false,
    color: 'gray',
    type: 'electronics'
  },
  {
    id: '12',
    name: 'Denim Jacket',
    description: 'Classic denim jacket with a modern fit, perfect for layering in any season.',
    price: 2799,
    imageUrl: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=3270&q=80',
    category: 'clothing',
    inStock: true,
    color: 'blue',
    type: 'clothing'
  }
];

// Get unique categories, colors and types from products
export const categories = Array.from(new Set(products.map(product => product.category)));
export const colors = Array.from(new Set(products.map(product => product.color)));
export const types = Array.from(new Set(products.map(product => product.type)));

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
