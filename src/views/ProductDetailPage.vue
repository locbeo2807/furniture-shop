<template>
  <div v-if="!loading" class="product-detail py-16 bg-gray-100">
    <div class="max-w-screen-xl mx-auto bg-white p-10 rounded-lg shadow-lg">
      <div class="flex flex-col lg:flex-row gap-10">
        <!-- Phần hiển thị hình ảnh sản phẩm -->
        <div class="flex-1">
          <div class="flex gap-4 mb-6">
            <div v-for="(img, index) in product.images" :key="index" class="w-20 h-20 overflow-hidden rounded-md border">
              <img :src="img" alt="Product Image" class="object-cover w-full h-full" />
            </div>
          </div>
          <img v-if="product.preview_image" :src="product.preview_image" alt="Product Image" class="w-full h-auto rounded-lg shadow-md" />
        </div>

        <!-- Thông tin chi tiết sản phẩm -->
        <div class="flex-1">
          <h1 class="text-5xl font-bold">{{ product.name }}</h1>
          <p class="text-3xl text-green-600 font-semibold mt-4">{{ formattedTotalPrice }}</p>
          <p class="mt-6 text-gray-700">{{ product.description || 'No description available.' }}</p>

          <!-- Nút Add to Cart và số lượng -->
          <div class="flex items-center gap-4 mt-8">
            <div class="flex items-center">
              <button @click="decreaseQuantity" class="bg-gray-200 text-gray-800 py-2 px-4 rounded-l-lg">-</button>
              <input type="text" v-model.number="quantity" class="w-16 text-center border-t border-b" />
              <button @click="increaseQuantity" class="bg-gray-200 text-gray-800 py-2 px-4 rounded-r-lg">+</button>
            </div>
            <button @click="handleAddToCart" class="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-8 rounded-lg">
              Add to Cart
            </button>
          </div>
          <p v-if="message" class="text-green-600 mt-4">{{ message }}</p>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { addToCart } from '../auth';

export default {
  setup() {
    const route = useRoute();
    const product = ref(null);
    const productId = route.params.id;
    const loading = ref(true);
    const quantity = ref(1);
    const message = ref('');

    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`https://learning.sonthanh.net.vn/api/products/${productId}`);
        product.value = response.data.data?.product || null;
      } catch (error) {
        console.error('Error fetching product:', error);
        product.value = null;
      } finally {
        loading.value = false;
      }
    };

    const increaseQuantity = () => {
      quantity.value++;
    };

    const decreaseQuantity = () => {
      if (quantity.value > 1) quantity.value--;
    };

    // Tính toán tổng giá dựa trên số lượng
    const formattedTotalPrice = computed(() => {
      if (product.value && product.value.price) {
        const total = product.value.price * quantity.value;
        return `${total}.000 VND`;
      }
      return 'Price not available';
    });

    // Xử lý khi nhấn nút Add to Cart
    const handleAddToCart = () => {
      if (product.value) {
        addToCart({ ...product.value, quantity: quantity.value });
        message.value = 'Product added to cart!';
        setTimeout(() => {
          message.value = '';
        }, 2000);
      }
    };

    onMounted(fetchProductDetails);

    return {
      product,
      loading,
      formattedTotalPrice,
      quantity,
      increaseQuantity,
      decreaseQuantity,
      handleAddToCart,
      message
    };
  }
};
</script>

<style scoped>
.product-detail {
  padding: 2rem 0;
}
</style>
