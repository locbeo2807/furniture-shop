<template>
  <header>
    <nav class="bg-white border-b border-gray-200 px-4 lg:px-6 py-3 dark:bg-gray-800">
      <div class="flex justify-between items-center mx-auto max-w-screen-xl">
        <!-- Logo -->
        <router-link to="/" class="flex items-center">
          <i class="fas fa-store text-2xl text-yellow-500 mr-2"></i>
          <span class="text-xl font-semibold whitespace-nowrap dark:text-white">Funiro</span>
        </router-link>

        <!-- Menu điều hướng chính -->
        <div class="hidden lg:flex lg:items-center lg:space-x-6 lg:ml-auto">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/shop" class="nav-link">Shop</router-link>
          <router-link to="/about" class="nav-link">About</router-link>
          <router-link to="/contact" class="nav-link">Contact</router-link>
          <router-link to="/check" class="nav-link">Check</router-link>
          <router-link to="/blog" class="nav-link">Blog</router-link>
        </div>

        <!-- Phần điều hướng bên phải -->
        <div class="flex items-center space-x-6">
          <!-- Kiểm tra trạng thái đăng nhập -->
          <div v-if="authState.isLoggedIn" class="flex items-center space-x-4">
            <i class="fas fa-user-circle text-2xl text-gray-800 dark:text-white"></i>
            <span class="text-gray-800 dark:text-white">{{ authState.username }}</span>
            <button @click="handleLogout" class="text-red-500 hover:underline">
              <i class="fas fa-sign-out-alt mr-2"></i> Log Out
            </button>
          </div>
          <div v-else class="flex items-center space-x-4">
            <router-link to="/login" class="text-gray-800 dark:text-white hover:bg-gray-50 px-4 py-2">
              <i class="fas fa-sign-in-alt mr-2"></i> Log in
            </router-link>
            <router-link to="/signup" class="text-gray-800 dark:text-white hover:bg-gray-50 px-4 py-2">
              <i class="fas fa-user-plus mr-2"></i> Sign up
            </router-link>
          </div>

          <!-- Giỏ hàng -->
          <div class="relative" @mouseenter="toggleSidebar(true)" @mouseleave="toggleSidebar(false)">
            <router-link to="/cart" class="relative text-gray-800 dark:text-white">
              <i class="fas fa-shopping-cart"></i>
              <!-- Hiển thị số lượng sản phẩm trong giỏ hàng -->
              <span v-if="cartItemCount > 0" class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-2">
                {{ cartItemCount }}
              </span>
            </router-link>
            <!-- Sidebar giỏ hàng -->
            <CartSidebar v-if="isSidebarVisible" :cartItems="authState.cartItems" @remove-item="removeItem" />
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { ref, computed } from 'vue';
import { authState, logout, removeFromCart } from '../auth';
import CartSidebar from '../components/CartSidebar.vue';

export default {
  components: {
    CartSidebar
  },
  setup() {
    const isSidebarVisible = ref(false);

    // Tính toán số lượng sản phẩm trong giỏ hàng
    const cartItemCount = computed(() => {
      return authState.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    });

    // Hiển thị hoặc ẩn Sidebar giỏ hàng
    const toggleSidebar = (visible) => {
      isSidebarVisible.value = visible;
    };

    // Xử lý xóa sản phẩm khỏi giỏ hàng
    const removeItem = (id) => {
      removeFromCart(id);
    };

    // Xử lý đăng xuất
    const handleLogout = () => {
      logout();
      window.location.reload();
    };
  
    return {
      authState,
      isSidebarVisible,
      cartItemCount,
      toggleSidebar,
      removeItem,
      handleLogout
    };
  }
};
</script>

<style scoped>
.nav-link {
  display: block;
  padding: 0.5rem 1rem;
  color: #4b5563;
  font-weight: 500;
  transition: color 0.3s ease;
}
.nav-link:hover {
  color: #f59e0b;
}
.dark .nav-link {
  color: #9ca3af;
}
.dark .nav-link:hover {
  color: #ffffff;
}
.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.75rem;
}
</style>
