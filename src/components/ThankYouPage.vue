<template>
  <div class="thank-you-page text-center py-20">
    <h1 class="text-4xl font-bold text-green-600 mb-6">Cảm ơn bạn đã đặt hàng!</h1>
    <div v-if="orderData" class="order-summary bg-gray-50 p-6 rounded-lg shadow">
      <h2 class="text-2xl font-bold mb-4">Thông tin đơn hàng</h2>
      <p><strong>Họ tên:</strong> {{ orderData.customer.name }}</p>
      <p><strong>Địa chỉ:</strong> {{ orderData.customer.address }}</p>
      <p><strong>Điện thoại:</strong> {{ orderData.customer.phone }}</p>
      <p><strong>Phương thức thanh toán:</strong> {{ orderData.paymentMethod }}</p>
      <p><strong>Ngày đặt hàng:</strong> {{ orderData.orderDate }}</p>
      <h3 class="text-xl font-bold mt-6">Sản phẩm</h3>
      <ul>
        <li v-for="(item, index) in orderData.cartItems" :key="index">
          {{ item.name }} - Số lượng: {{ item.quantity }} - Giá: {{ item.price }}.000 VND
        </li>
      </ul>
      <p class="font-bold mt-4">Tổng cộng: {{ orderData.total }} VND</p>
    </div>
    <router-link to="/" class="btn-primary mt-10">
     <button>
      Quay lại trang chủ
      </button>   
    </router-link>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const orderData = ref(null);

    onMounted(() => {
      orderData.value = JSON.parse(localStorage.getItem("orderData"));
    });

    return {
      orderData,
    };
  }
};
</script>
