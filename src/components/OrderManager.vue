<template>
  <div class="order-manager bg-white p-8 rounded-lg shadow-lg">
    <h2 class="text-3xl font-bold mb-8">Quản lý đơn hàng</h2>
    <table class="min-w-full bg-white border-collapse">
      <thead>
        <tr>
          <th class="border-b py-4 text-left">Mã số đơn hàng</th>
          <th class="border-b py-4 text-left">Khách hàng</th>
          <th class="border-b py-4 text-left">Ngày đặt hàng</th>
          <th class="border-b py-4 text-left">Trạng thái</th>
          <th class="border-b py-4 text-left">Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id" class="hover:bg-gray-100">
          <td class="border-b py-4">{{ order.id }}</td>
          <td class="border-b py-4">{{ order.customer.name }}</td>
          <td class="border-b py-4">{{ order.orderDate }}</td>
          <td class="border-b py-4">{{ order.status }}</td>
          <td class="border-b py-4">
            <button
              v-if="order.status === 'Chưa giao'"
              @click="updateOrderStatus(order.id, 'Đã giao')"
              class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Đánh dấu đã giao
            </button>
            <button
              v-if="order.status === 'Đã giao'"
              @click="updateOrderStatus(order.id, 'Chưa giao')"
              class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Đánh dấu chưa giao
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
export default {
  data() {
    return {
      orders: JSON.parse(localStorage.getItem("orders")) || []
    };
  },
  methods: {
    updateOrderStatus(orderId, newStatus) {
      // Tìm đơn hàng theo ID
      const orderIndex = this.orders.findIndex((order) => order.id === orderId);
      if (orderIndex !== -1) {
        // Cập nhật trạng thái đơn hàng
        this.orders[orderIndex].status = newStatus;

        // Lưu lại danh sách đơn hàng vào localStorage
        localStorage.setItem("orders", JSON.stringify(this.orders));
      }
    }
  }
};
</script>


<style scoped>
.order-manager {
  max-width: 800px;
  margin: 0 auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  background-color: #f3f4f6;
  font-weight: bold;
  padding: 12px;
  text-align: left;
}

td {
  padding: 12px;
  text-align: left;
}

tr:hover {
  background-color: #f9fafb;
}

button {
  transition: background-color 0.2s ease-in-out;
}
</style>
