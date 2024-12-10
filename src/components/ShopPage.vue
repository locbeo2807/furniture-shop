<template>
  <section class="shop-page py-10 bg-gray-100">
    <div class="max-w-screen-xl mx-auto">
      <!-- Banner với hình nền mờ và tiêu đề -->
      <div class="banner relative h-64 flex items-center justify-center mb-10">
        <div class="banner-background absolute inset-0"></div>
        <div class="relative z-10 text-center">
          <h1 class="text-5xl font-bold text-white">Shop</h1>
          <p class="text-white text-sm mt-2">Home &gt; Shop</p>
        </div>
      </div>

      <!-- Nội dung sản phẩm -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-10">
        <div
          v-for="product in currentProducts"
          :key="product.id"
          class="relative group product-card bg-white p-4 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
        >
          <!-- Hình ảnh sản phẩm -->
          <img
            :src="product.preview_image"
            alt="Product"
            class="w-full h-64 object-cover rounded-lg"
          />

          <!-- Nút Add to Cart và View Details khi hover -->
          <div class="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-4">
            <button @click="handleAddToCart(product)" class="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition duration-300">
              Add to Cart
            </button>
            <button @click="viewDetails(product.id)" class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
              View Details
            </button>
          </div>

          <!-- Tên sản phẩm và giá -->
          <h4 class="mt-4 text-lg font-semibold text-gray-800">{{ product.name }}</h4>
          <p class="text-gray-700 font-bold">{{ product.price }}.000 VND</p>
        </div>
        
      </div>
      

      <!-- Nút phân trang -->
      <div class="flex justify-center mt-6 space-x-4">
        <button @click="changePage(-1)" :disabled="currentPage === 1" class="pagination-btn">Previous</button>
        <button @click="changePage(1)" :disabled="currentPage === totalPages" class="pagination-btn">Next</button>
      </div>
    </div>
  </section>
  <!-- Features Section -->
    <section class="features bg-[#fdf3e3] py-12 mt-12">
      <div
        class="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center"
      >
        <div class="feature-item">
          <i class="fas fa-trophy text-4xl text-yellow-500"></i>
          <h4 class="mt-4 text-xl font-semibold">High Quality</h4>
          <p class="text-gray-600">Crafted from top materials</p>
        </div>
        <div class="feature-item">
          <i class="fas fa-shield-alt text-4xl text-green-500"></i>
          <h4 class="mt-4 text-xl font-semibold">Warranty Protection</h4>
          <p class="text-gray-600">Over 2 years</p>
        </div>
        <div class="feature-item">
          <i class="fas fa-shipping-fast text-4xl text-blue-500"></i>
          <h4 class="mt-4 text-xl font-semibold">Free Shipping</h4>
          <p class="text-gray-600">Order over 150 $</p>
        </div>
        <div class="feature-item">
          <i class="fas fa-headset text-4xl text-purple-500"></i>
          <h4 class="mt-4 text-xl font-semibold">24 / 7 Support</h4>
          <p class="text-gray-600">Dedicated support</p>
        </div>
      </div>
    </section>
</template>

<script>
import axios from 'axios';
import { addToCart } from '../auth';

export default {
  data() {
    return {
      products: [],
      itemsPerPage: 4,
      currentPage: 1,
      totalPages: 1,
    };
  },
  async created() {
    await this.fetchProducts();
  },
  computed: {
    currentProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.products.slice(start, end);
    },
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get('https://learning.sonthanh.net.vn/api/products', {
          params: { size: 20, page: 2, 'filter[id][gte]': 24 },
        });
        if (response.data && response.data.data) {
          this.products = response.data.data.products || [];
          this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    handleAddToCart(product) {
      const productToAdd = {
        id: product.id,
        name: product.name,
        price: product.price,
        preview_image: product.preview_image,
        quantity: 1,
      };
      addToCart(productToAdd);
    },
    viewDetails(productId) {
      this.$router.push(`/product/${productId}`);
    },
    changePage(direction) {
      this.currentPage += direction;
    },
  },
};
</script>

<style scoped>
.banner {
  position: relative;
  overflow: hidden;
}

.banner-background {
  background-image: url('https://s3-alpha-sig.figma.com/img/1461/f3d6/ff74c027a1888544144abe4be6e02cbf?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ghTagDUzYeij86XyXDpP8Hboj7iUkkJyBUTToHtiRGxu6prrmRYK~KbMwyMFJXJM1MOMZ7cHie~atWrOPBcx1l1hrnDBd-aiVaWloxyb-odaa0CVD5GnSXT1aNW9XUGPr7~DwmuVXhicMyTdQeJMVnorVn1YWhwWMLUcfi5TKOxK98yIQ9eQfyP8DK7LkwMkgymXVVDiUDL0uiO141OOqU62tD0qAL-CjLxYM44gMsFjAkbv5cdM-CnmonBmYFo6T7FFbeOwQhj4WNlFjCdAV~5fR9arn22ctdZzP-WJAhrUKfxyi8Yw7lEqrfWl1hBoMwp3a9UBszC7PPaPtbCmZQ__');
  background-size: cover;
  background-position: center;
  filter: blur(8px);
}

.product-card img {
  transition: transform 0.3s ease-in-out;
}

.product-card:hover img {
  transform: scale(1.05);
}

.pagination-btn {
  background-color: #f59e0b;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.pagination-btn:hover {
  background-color: #d97706;
}

.pagination-btn:disabled {
  background-color: #e5e7eb;
  cursor: not-allowed;
}
</style>
