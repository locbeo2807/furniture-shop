<template>
  <div class="check-order-page bg-white p-8 rounded-lg shadow-lg max-w-xl mx-auto mt-16">
    <h2 class="text-3xl font-bold mb-8 text-center">Kiểm tra đơn hàng</h2>
    <form @submit.prevent="checkOrder">
      <div class="mb-6">
        <label class="block mb-2 font-medium">Nhập số điện thoại</label>
        <input v-model="phone" type="text" class="input-field" placeholder="Số điện thoại" required />
      </div>
      <button type="submit" class="btn-primary w-full">Tìm kiếm đơn hàng</button>
    </form>

    <!-- Hiển thị kết quả đơn hàng -->
    <div v-if="orderFound" class="order-result mt-8 bg-gray-100 p-6 rounded-lg">
      <h3 class="text-2xl font-semibold mb-4">Đơn hàng của bạn</h3>
      <p><strong>Mã đơn hàng:</strong> {{ orderFound.id }}</p>
      <p><strong>Khách hàng:</strong> {{ orderFound.customer.name }}</p>
      <p><strong>Số điện thoại:</strong> {{ orderFound.customer.phone }}</p>
      <p><strong>Ngày đặt:</strong> {{ orderFound.orderDate }}</p>
      <p><strong>Tổng tiền:</strong> {{ orderFound.total.toLocaleString('vi-VN') }}.000 VND</p>
      <p><strong>Trạng thái:</strong> {{ orderFound.status }}</p>

      <!-- Danh sách sản phẩm -->
      <div class="products mt-6">
        <h4 class="text-xl font-bold mb-4">Danh sách sản phẩm</h4>
        <div v-for="item in orderFound.cartItems" :key="item.id" class="product-item flex items-center mb-4">
          <img :src="item.preview_image" alt="Product Image" class="w-20 h-20 object-cover rounded-lg mr-4" />
          <div>
            <p class="font-semibold">{{ item.name }}</p>
            <p>Số lượng: {{ item.quantity }}</p>
            <p>Giá: {{ item.price.toLocaleString('vi-VN') }}.000 VND</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Thông báo khi không tìm thấy đơn hàng -->
    <div v-else-if="searched" class="mt-8 text-center text-red-500">
      Không tìm thấy đơn hàng với số điện thoại này.
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const phone = ref("");
    const orderFound = ref(null);
    const searched = ref(false);

    const checkOrder = () => {
      const orders = JSON.parse(localStorage.getItem("orders")) || [];
      const foundOrder = orders.find(order => order.customer.phone === phone.value);

      if (foundOrder) {
        orderFound.value = foundOrder;
      } else {
        orderFound.value = null;
      }
      searched.value = true;
    };

    return {
      phone,
      orderFound,
      searched,
      checkOrder
    };
  }
};
</script>

<style scoped>
.check-order-page {
  max-width: 600px;
  margin: 0 auto;
}

.input-field {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-top: 4px;
}

.btn-primary {
  background-color: #2563eb;
  color: white;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #1e3a8a;
}

.products {
  margin-top: 20px;
}

.product-item {
  display: flex;
  align-items: center;
}

.product-item img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}
</style>
