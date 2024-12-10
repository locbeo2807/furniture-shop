<template>
  <div class="checkout-page">
    <div class="container mx-auto flex gap-8 py-16">
      <!-- Form thông tin khách hàng -->
      <div class="customer-info flex-1 bg-white p-8 rounded-lg shadow">
        <h2 class="text-2xl font-bold mb-6">Thông tin khách hàng</h2>
        <form @submit.prevent="handleOrder">
          <div class="mb-4">
            <label>Họ tên</label>
            <input
              v-model="customer.name"
              type="text"
              class="input-field"
              required
            />
          </div>
          <div class="mb-4">
            <label>Giới tính</label>
            <select v-model="customer.gender" class="input-field">
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          </div>
          <div class="mb-4">
            <label>Địa chỉ</label>
            <input
              v-model="customer.address"
              type="text"
              class="input-field"
              required
            />
          </div>
          <div class="mb-4">
            <label>Điện thoại</label>
            <input
              v-model="customer.phone"
              type="text"
              class="input-field"
              required
            />
          </div>
          <div class="mb-4">
            <label>Email</label>
            <input
              v-model="customer.email"
              type="email"
              class="input-field"
              required
            />
          </div>
          <div class="mb-4">
            <label>Ngày sinh</label>
            <input v-model="customer.dob" type="date" class="input-field" />
          </div>
          <div class="mb-4">
            <label>CMND</label>
            <input
              v-model="customer.idCard"
              type="text"
              class="input-field"
              required
            />
          </div>
          <div class="mb-4">
            <label>Hình thức thanh toán</label>
            <div class="flex gap-4">
              <label
                ><input type="radio" value="Tiền mặt" v-model="paymentMethod" />
                Tiền mặt</label
              >
              <label
                ><input
                  type="radio"
                  value="Chuyển khoản"
                  v-model="paymentMethod"
                />
                Chuyển khoản</label
              >
              <label
                ><input type="radio" value="Ship COD" v-model="paymentMethod" />
                Ship COD</label
              >
            </div>
          </div>
          <!-- Hiển thị thông tin chuyển khoản nếu chọn "Chuyển khoản" -->
          <div
            v-if="paymentMethod === 'Chuyển khoản'"
            class="mb-4 bg-gray-100 p-4 rounded-lg"
          >
            <h3 class="text-lg font-bold mb-2">Thông tin chuyển khoản</h3>
            <p>
              Số tài khoản ngân hàng: <strong>123456789</strong> (Ngân hàng ABC)
            </p>
            <p>Số MoMo: <strong>0987654321</strong></p>
            <p class="text-red-500 mt-2">
              * Vui lòng chuyển khoản trước khi xác nhận đơn hàng.
            </p>
          </div>
          <button type="submit" class="btn-primary">Đặt hàng</button>
        </form>
      </div>

      <!-- Giỏ hàng bên phải -->
      <div class="cart-summary bg-gray-50 p-6 rounded-lg shadow">
        <h2 class="text-xl font-bold mb-4">Giỏ hàng của bạn</h2>
        <div
          v-for="item in cartItems"
          :key="item.id"
          class="flex items-center justify-between mb-4"
        >
          <p>{{ item.name }}</p>
          <p>{{ item.quantity }} x {{ item.price }}.000 VND</p>
        </div>
        <p class="font-bold text-yellow-600">
          Tổng tiền: {{ formattedTotal }}.000 VND
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { authState, clearCart } from "../auth";

export default {
  setup() {
    const router = useRouter();
    const cartItems = ref(authState.cartItems);

    const customer = ref({
      name: "",
      gender: "Nam",
      address: "",
      phone: "",
      email: "",
      dob: "",
      idCard: "",
    });

    const paymentMethod = ref("Tiền mặt");

    const formattedTotal = computed(() => {
      return cartItems.value.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    });

    const handleOrder = () => {
      if (cartItems.value.length === 0) {
        alert("Giỏ hàng của bạn đang trống!");
        return;
      }

      // Hiển thị thông tin chuyển khoản nếu chọn "Chuyển khoản"
      if (paymentMethod.value === "Chuyển khoản") {
        const confirmation = confirm(
          `Vui lòng chuyển khoản tới:\n` +
            `Số tài khoản: 123456789 - Ngân hàng ABC\n` +
            `Số MoMo: 0987654321\n` +
            `Tổng tiền: ${formattedTotal.value}.000 VND\n\n` +
            `Nhấn "OK" để xác nhận đã chuyển khoản.`
        );

        if (!confirmation) {
          // Hủy quy trình đặt hàng nếu khách không xác nhận
          return;
        }
      }

      // Tạo dữ liệu đơn hàng
      const orderData = {
        id: Math.floor(Math.random() * 100000), 
        customer: { ...customer.value },
        paymentMethod: paymentMethod.value,
        cartItems: [...cartItems.value],
        total: formattedTotal.value,
        orderDate: new Date().toLocaleString(),
        created_at: new Date().toISOString(),
        status: "Chưa giao", 
      };

      try {
        const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
        existingOrders.push(orderData);
        localStorage.setItem("orders", JSON.stringify(existingOrders));

        clearCart();
        cartItems.value = [];

        alert("Đặt hàng thành công!");
        router.push("/thank-you");
      } catch (error) {
        console.error("Lỗi khi lưu đơn hàng:", error);
        alert("Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại!");
      }
    };

    return {
      cartItems,
      customer,
      paymentMethod,
      formattedTotal,
      handleOrder,
    };
  },
};
</script>
<style scoped>
.input-field {
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.btn-primary {
  background-color: #2563eb;
  color: #fff;
  padding: 12px 24px;
  border-radius: 8px;
  margin-top: 16px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #1e40af;
}
</style>
