// Base API URL
const API_URL = 'http://localhost:5000/api';
// const API_URL = 'http://127.0.0.1:5500/api';

// Helper function for making API requests
async function fetchAPI(endpoint, options = {}) {
  // Get token from localStorage if available
  const token = localStorage.getItem('userToken');
  
  // Set default headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };
  
  // Add authorization header if token exists
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Product API functions
const ProductAPI = {
  // Get all products
  getProducts: async (keyword = '', page = 1, category = '') => {
    let url = `/products?page=${page}`;
    if (keyword) url += `&keyword=${keyword}`;
    if (category) url += `&category=${category}`;
    
    return fetchAPI(url);
  },
  
  // Get a single product by ID
  getProductById: async (id) => {
    return fetchAPI(`/products/${id}`);
  },
  
  // Get featured products
  getFeaturedProducts: async () => {
    return fetchAPI('/products/featured');
  },

  // Get new arrivals
  getNewArrivals: async () => {
    return fetchAPI('/products/new-arrivals');
  }
};

// User API functions
const UserAPI = {
  // Register a new user
  register: async (userData) => {
    return fetchAPI('/users', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },
  
  // Login user
  login: async (email, password) => {
    return fetchAPI('/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  },
  
  // Get user profile
  getProfile: async () => {
    return fetchAPI('/users/profile');
  },
  
  // Update user profile
  updateProfile: async (userData) => {
    return fetchAPI('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(userData)
    });
  }
};

// Order API functions
const OrderAPI = {
  // Create a new order
  createOrder: async (orderData) => {
    return fetchAPI('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
  },
  
  // Get user's orders
  getMyOrders: async () => {
    return fetchAPI('/orders/myorders');
  },
  
  // Get order details by ID
  getOrderById: async (id) => {
    return fetchAPI(`/orders/${id}`);
  },
  
  // Update order to paid
  updateOrderToPaid: async (id, paymentResult) => {
    return fetchAPI(`/orders/${id}/pay`, {
      method: 'PUT',
      body: JSON.stringify(paymentResult)
    });
  }
};

// Export all API services
window.API = {
  Product: ProductAPI,
  User: UserAPI,
  Order: OrderAPI
};