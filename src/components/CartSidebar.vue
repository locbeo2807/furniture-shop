<template>
  <div class="cart-sidebar" v-if="cartItems.length > 0">
    <!-- Tiêu đề và nút đóng -->
    <div class="header flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Shopping Cart</h2>
      <button @click="$emit('close-sidebar')" class="text-gray-500 hover:text-gray-700">
        <i class="fas fa-times"></i>
      </button>
    </div>

    <!-- Danh sách sản phẩm trong giỏ hàng -->
    <div v-for="(item, index) in cartItems" :key="index" class="cart-item flex items-center mb-6">
      <img :src="item.preview_image" alt="Product" class="w-20 h-20 rounded-lg mr-4 object-cover" />
      <div class="flex-1">
        <h3 class="font-semibold text-gray-800">{{ item.name }}</h3>
        <p class="text-gray-600">{{ item.quantity }} x {{ item.price }}.000 VND</p>
      </div>
      <button @click="$emit('remove-item', item.id)" class="text-red-500 hover:text-red-700">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>

    <!-- Tổng tiền -->
    <p class="text-right font-bold text-yellow-600 text-lg mb-6">Subtotal: {{ formattedTotal }}</p>

    <!-- Nút thao tác -->
    <div class="flex justify-between gap-4">
      <router-link to="/cart" @click="$emit('close-sidebar')" class="btn-primary">
        View Cart
      </router-link>
      <button @click="checkout" class="btn-secondary">Checkout</button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
  props: {
    cartItems: Array
  },
  setup(props) {
    const router = useRouter();

    // Tính tổng tiền
    const formattedTotal = computed(() => {
      const total = props.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      return `₫${total}.000`;
    });

    // Hàm xử lý khi nhấn nút "Checkout"
    const checkout = () => {
      if (props.cartItems.length === 0) {
        alert("Your cart is empty!");
      } else {
        router.push('/checkout');
      }
    };

    return {
      formattedTotal,
      checkout
    };
  }
};
</script>

<style scoped>
.cart-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 340px;
  height: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: -4px 0 15px rgba(0, 0, 0, 0.1);
  z-index: 1100;
  overflow-y: auto;
  transition: transform 0.3s ease-in-out;
}

.header {
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.cart-item {
  border-bottom: 1px solid #f3f4f6;
  padding-bottom: 10px;
}

.btn-primary {
  background-color: #f59e0b;
  color: #fff;
  padding: 10px 16px;
  border-radius: 8px;
  text-align: center;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #d97706;
}

.btn-secondary {
  background-color: #3b82f6;
  color: #fff;
  padding: 10px 16px;
  border-radius: 8px;
  text-align: center;
  transition: background-color 0.3s ease;
}

.btn-secondary:hover {
  background-color: #2563eb;
}
</style>
