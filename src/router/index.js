import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import ShopPage from '../components/ShopPage.vue';
import ProductDetailPage from '../views/ProductDetailPage.vue';
import SignupPage from '../components/SignupPage.vue';
import LoginPage from '../components/LoginPage.vue';
import CartPage from '../components/CartPage.vue';
import CheckoutPage from '../components/CheckoutPage.vue';
import ThankYouPage from '../components/ThankYouPage.vue'
import AdminDashboard from '../components/AdminDashboard.vue'
import AdminPage from '../views/AdminPage.vue'
import ProductList from '../components/ProductList.vue'
import { getCurrentUser, isAdmin } from '../auth';
import OrderManager from '../components/OrderManager.vue'
import UserManager from '../components/UserManager.vue'
import CheckOrder from '../components/CheckOrder.vue'
const routes = [
  { path: '/', component: HomePage, name: 'Home' },
  { path: '/shop', component: ShopPage, name: 'Shop' },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetailPage,
    props: true,
  },
  { path: '/signup', name: 'Signup', component: SignupPage },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/cart', component: CartPage, name: 'Cart' },
  // Thêm route cho trang Checkout
  { path: '/checkout', component: CheckoutPage, name: 'Checkout' },
  { path: '/thank-you', component: ThankYouPage, name: 'ThankYou' },
  {
    path: '/admin',
    component: AdminPage,
    meta: { requiresAdmin: true },
    children: [
      { path: 'dashboard', component: AdminDashboard, name: 'AdminDashboard' },
      { path: 'products', component: ProductList, name: 'ProductList' },
      { path: 'orders', component: OrderManager, name: 'OrderManager' },
      { path: 'users', component: UserManager, name: 'UserManager' }
    ]
  },
  { path: '/check', component: CheckOrder, name: 'CheckOrder' }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  const user = getCurrentUser();
  if (to.meta.requiresAdmin && (!user || !isAdmin())) {
    next('/login');
  } else {
    next();
  }
});

export default router;
