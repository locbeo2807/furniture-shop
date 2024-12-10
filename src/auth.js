import { reactive } from 'vue';

export const authState = reactive({
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
  username: localStorage.getItem('username') || '',
  role: localStorage.getItem('role') || '',
  cartItems: JSON.parse(localStorage.getItem('cartItems')) || []
});

let users = JSON.parse(localStorage.getItem('users')) || [
  { username: 'admin', password: 'admin123', email: 'admin@example.com', role: 'admin' },
  { username: 'user', password: 'user123', email: 'user@example.com', role: 'user' }
];

function saveUsersToLocalStorage() {
  localStorage.setItem('users', JSON.stringify(users));
}

export function login(username, password) {
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    authState.isLoggedIn = true;
    authState.username = user.username;
    authState.role = user.role;
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', user.username);
    localStorage.setItem('role', user.role);
    return true;
  }
  return false; 
}

export function signup(username, password, email) {
  const userExists = users.some(u => u.username === username || u.email === email);
  if (userExists) {
    return false; 
  }


  const newUser = { username, password, email, role: 'user' };
  users.push(newUser);
  saveUsersToLocalStorage(); 
  return true;
}


export function getCurrentUser() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role');

  return isLoggedIn && username
    ? { username, role, isLoggedIn }
    : null;
}


export function isAdmin() {
  return authState.role === 'admin';
}


export function logout() {
  authState.isLoggedIn = false;
  authState.username = '';
  authState.role = '';
  authState.cartItems = [];
  
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('username');
  localStorage.removeItem('role');
  localStorage.removeItem('cartItems');
}


export function addToCart(product) {
  const existingItem = authState.cartItems.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += product.quantity;
  } else {
    authState.cartItems.push({ ...product, quantity: product.quantity });
  }
  updateCartInLocalStorage();
}


export function removeFromCart(productId) {
  authState.cartItems = authState.cartItems.filter(item => item.id !== productId);
  updateCartInLocalStorage();
}


function updateCartInLocalStorage() {
  localStorage.setItem('cartItems', JSON.stringify(authState.cartItems));
}


export function clearCart() {
  authState.cartItems = [];
  localStorage.removeItem('cartItems');
}
