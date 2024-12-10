<template>
  <div class="product-manager">
    <h2 class="text-2xl font-bold">Quản lý sản phẩm</h2>
    <button @click="fetchProducts" class="fetch-btn">Tải sản phẩm từ API</button>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="products.length > 0" class="product-list">
      <div v-for="product in products" :key="product.id" class="product-card">
        <img :src="product.preview_image" alt="Product Image" class="product-image" />
        <h3>{{ product.name }}</h3>
        <p>Giá: {{ product.price }} VND</p>
        <p>Số lượng tồn kho: {{ product.quantity }}</p>
        <p>{{ product.description }}</p>
      </div>
    </div>
    <p v-else>Không có sản phẩm nào để hiển thị.</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: [],
      error: null
    };
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get('https://learning.sonthanh.net.vn/api/products?size=20&page=2&filter[id][gte]=24');
        if (response.data && response.data.data && response.data.data.products) {
          this.products = response.data.data.products;
        } else {
          this.error = 'Không tìm thấy sản phẩm.';
        }
      } catch (error) {
        this.error = 'Lỗi khi kết nối tới API: ' + error.message;
        console.error(error);
      }
    }
  },
  mounted() {
    this.fetchProducts();
  }
};
</script>

<style scoped>
.product-manager {
  padding: 20px;
  background-color: #f9f9f9;
  text-align: center;
}

.fetch-btn {
  background-color: #3b82f6;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
}

.error {
  color: red;
  margin-top: 10px;
}

.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  justify-items: center;
}

.product-card {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  max-width: 300px;
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 10px;
}

h3 {
  font-size: 18px;
  margin: 10px 0;
}

p {
  margin: 5px 0;
}
</style>
