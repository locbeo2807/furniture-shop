<template>
  <div>
    <!-- Banner chính -->
    <section class="banner py-20 bg-gray-100">
      <div class="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center gap-10">
        <div class="flex-1 text-center lg:text-left">
          <h2 class="text-4xl font-bold">Discover Our New Collection</h2>
          <p class="mt-4 text-gray-700">Explore the latest trends in furniture with our exclusive collection.</p>
          <button class="mt-6 bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-lg transition-all">
            Buy Now
          </button>
        </div>
        <div class="flex-1">
          <img
            src="https://s3-alpha-sig.figma.com/img/98fb/219f/a11f805aade2224f1d6658764a2395df?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iz2P1soSJbfNI-siq~9DHpn2XNwNtgRaWPFkfzGZoKZUz56T59oWG3mAsCZr2FVzjr4ZaSmgwqubyrNH~9jhAEidIZY4P1JCtNOLwXsAYVVn~lKG~FZaGdaNJcP6TYYkaa66B5idOfF5JTqHSDt8sw1O6zB6etOjrM0PIzn~ZaBVXYUkl3l-SeOFbCQ4pwsu22D-EqS5NtA1zIIHeXVDvpFocSjtjZJix~1an0vp2nY8pOWu-xyaoPi5JHGxmRkpNB5zOkcRvNHmPtMaCspIMQSaUP4IGHc2VmM87v1KOBeOe4F87RRMaabJ8AGucgzaK20Zn0xkZG2Qyw5FPziUCw__"
            alt="New Collection"
            class="rounded-lg shadow-md "
          />
        </div>
      </div>
    </section>

    <!-- Phần danh mục sản phẩm -->
    <section class="categories py-16 bg-white">
      <div class="max-w-screen-xl mx-auto text-center">
        <h3 class="text-3xl font-semibold mb-8">Browse The Range</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(category, index) in categories" :key="index" class="category-item group">
            <div class="overflow-hidden rounded-lg h-64 flex items-center justify-center transition-transform duration-300">
              <img :src="category.image" alt="Category" class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
            </div>
            <h4 class="text-xl mt-4">{{ category.name }}</h4>
          </div>
        </div>
      </div>
    </section>

    <!-- Phần sản phẩm nổi bật -->
    <section class="featured-products py-16 bg-gray-100">
      <div class="max-w-screen-xl mx-auto">
        <h3 class="text-3xl font-semibold mb-10 text-center">Featured Products</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            v-for="product in products"
            :key="product.id"
            class="relative group product-card bg-white p-4 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <img
              :src="product.preview_image"
              alt="Product"
              class="w-full h-64 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
            />
            <div class="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-4">
              <button @click="handleAddToCart(product)" class="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg">
                Add to Cart
              </button>
              <button @click="viewDetails(product.id)" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">
                View Details
              </button>
            </div>
            <h4 class="mt-4 text-lg font-semibold text-gray-800">{{ product.name }}</h4>
            <p class="text-gray-800 font-bold">{{ product.price }}.000 VND</p>
          </div>
        </div>

        <!-- Nút Show More căn giữa -->
        <div class="flex justify-center mt-10">
          <button
            v-if="page !== -1"
            @click="loadMore"
            class="bg-gray-800 hover:bg-gray-700 text-white py-3 px-8 rounded-lg"
          >
            Show More
          </button>
        </div>
      </div>
    </section>
    <!-- Phần hashtag chia sẻ -->
    <section class="hashtag-section py-12 bg-white">
      <div class="max-w-screen-xl mx-auto text-center">
        <h3 class="text-3xl font-semibold">
          Share your setup with #FuniroFurniture
        </h3>
        <div class="grid grid-cols-3 gap-6 mt-8">
          <div class="hashtag-image">
            <img
              src="https://s3-alpha-sig.figma.com/img/b167/0f90/40560e3b59b4fd3c2538107c6fa70736?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IKCcJ6lThNEruS6dQWRHlLI3-PzfpZFCbfsLZmG9B-pQKpOEwbwhAO~wMeui7IhB2JLSHf1wDRlGW8DNkuvdBdp2I-dKJ7i~gcEMp1uhqhHigEQyydfrt0sj-~iEzHQcyaTvIKdz4P9w79WN8IqSySas6kT~ofxa0NCut92CRpj0zY2MqfsBKf6UOB0ZAthaBXc0nHzeLIv2DXClJXOMZArnBDv-MSSqWN8QZJueXQ8xnrK-ICxMKI~16C4YexWrUOhaM8WxHC9O6ZlCRd~0fJILEhFnm7ega6EDTFAjts53GS4Gm-lhfa2MntS23HP6P7m9kEYczxMBBHNKMGUNxQ__"
              alt="Image 1"
              class="rounded-md object-cover h-64 w-full"
            />
          </div>
          <div class="hashtag-image">
            <img
              src="https://s3-alpha-sig.figma.com/img/e8ee/1dc9/413c23f2d7371be94a52ea9020db45cc?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PfngFE6L83nG6ZWhw~3-RhQOMz~rQ2k3Up8TwSbwMzHWJNG-4Ppg59~TI769LHjJJO2Jhg6C8yyL2tbRvT82D39A0IrUiJarGf0BTBItiN1eQxzgBatQP7wtmmKjP110EoVSQBp7RHU0HbVauSKzXVwdXsCNNRNGRJ9yqi9lt-TYiSQCW0EcL1Gl8b7N9Gq8uJ21gifugKmxDC9xXqUvryCJ0vv4dIA5U~Qt~kSJRcmaniV3Eo5PAW~BTAt3UupxbI0OPsbSlWMsP7YJGUz-yAZ4bUWI2wb1rEpWW05ygHucW3qd5T~uzQSDaIa0a5neI9osQrx5oBSDinELDsQqNw__"
              alt="Image 2"
              class="rounded-md object-cover h-64 w-full"
            />
          </div>
          <div class="hashtag-image">
            <img
              src="https://s3-alpha-sig.figma.com/img/9532/f812/360b02673b349021a24f23d4184b4e15?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UR9dNwPYyHQ6lMrE4AFu0RQeocw9jmEKifc0goFAGHvfPSICUQqA2gKBhioENcBzukYStHjhg3tamcsWpO2Q~XacoiYYRf22HAgueLOUg4HznJ2L53we2Pmvl0R5mHo0ScjF9KqBLdEhe2P9sqElNgVsAe6E3LIlTCapRcqERHoAiVQ1a9t7-hR722A10s9HCRXTCddFbiP~3JIRDFJ~mEm59XPlTzqLkR1MqVuQUwks3MikiBqUTNl-yJoyTjFkvj3MuH5uYRDPWyGHTT88Wp-CN83J-uD3JoXWTd~U7xuxJZxLZhqPtH4zXyL6jphN4TT4uzflEeBOIoUljal-iw__"
              alt="Image 3"
              class="rounded-md object-cover h-64 w-full"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
import { addToCart } from '../auth';

export default {
  data() {
    return {
      products: [],
      categories: [
        { name: 'Dining', image: 'https://s3-alpha-sig.figma.com/img/3740/8e44/4bdba3a6bef9d68df2d9a06e32e96c61?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hj2jtTmn9vdsnL59BrcghdrKo00LdO7MJwCvafPIffnI5puaYj-Td9kYTFmw2Px1cBCVr4DYuHhltN~vhZkAYBu7SDtYKRz0raR4mo-fob~rdMX9TnZmvxk5Wbw1-JspYTFmvGo-8XJRviGfMst0MIsPMWkyavJWMyQYohfb57DfsAffpfhbjVtaXKnQZDRPAbsVhqLTFXZrxk4EIIxaSUfHGPfcZvkcGx6OJUcH0mWgXMZY1-pDy~d5232HRK2NypDXO7yL4qkdgm~5Frh2bBK7~XzQuNCcTPc2TM0XS9J9M47e~BHMtw8Wv1kI5bybGMF1U07aIkemEjXQDAb7-Q__' },
        { name: 'Living', image: 'https://s3-alpha-sig.figma.com/img/cc8e/e62d/d2ee058546b4be8375f52bc6f537bd34?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YNGZBRzpTW7~M2BVkl1SNfOz5wkY6t5dS9NXu9k9diKw3s0VdtHanY2ZXQH~wtdaROilEVStZu~BB-BeKrFBb3uNntF8rtK-ZqdfkQXWvXfxy6-R9bsILBowe54apmicAJIcXdhlFyb5DJ5VoY972u49Hzn6mlVADKZ9yID~ukM3hdB284z7EpWsoayYg9Bn9LcWdLBKeGq3b-cb9N58qImOzHQn8J5Ng6FJBDTFv5qYfYuz6mSTLsM1mRXTM2sOeZ-Ps3b71Lqi2ZRi00ULpHwbcu774~Lte~DwYHh8HXoZaKHzMSdy-c1GUjihn6EgAYSI2nqgwWzdqY3MxohTdw__' },
        { name: 'Bedroom', image: 'https://s3-alpha-sig.figma.com/img/77e4/946e/ec6e291e21c9694ce22e6c5b50d777fe?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=B8K5SIqjbjagKakNWjmlifoXLdx9VV~cB0UKJ-Qc0dbzKzdOOp9HAsrRPg9KT2WFZCmLoSfqMQhdh2f0NBnaWY~jIbXUteBW3gT~SZC3h~Gd789N6Wy9mNFXtnEd-SGwEbZlZXGLtZJMFzsOJqP4ZYHLpZqxnqWY58Vhw-K-nxuM~PVvA4KdBh18V6PKv~4ObXG6o~lmAVLQ4G5v57fhmcBkHP--zYZ3LVYNpC0xTRtltk67pzqKutt7vgREI7zU2OA9SqE8kd7acvg5yETjnBCez32UQGNWkDcDBn8JoFe9OpN6K911el6-nZAlp2~3WwVt8w~Psjg1ykt0YmhgsQ__' }
      ],
      allProducts: [],
      page: 1,
      itemsPerPage: 8,
    };
  },
  async created() {
    await this.fetchProducts();
    this.loadInitialProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get('https://learning.sonthanh.net.vn/api/products', {
          params: { size: 20, page: 2, 'filter[id][gte]': 24 },
        });
        this.allProducts = response.data.data.products;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    loadInitialProducts() {
      this.products = this.allProducts.slice(0, this.itemsPerPage);
    },
    loadMore() {
      const start = this.products.length;
      const end = start + this.itemsPerPage;
      this.products = this.products.concat(this.allProducts.slice(start, end));
      if (this.products.length >= this.allProducts.length) this.page = -1;
    },
    handleAddToCart(product) {
      addToCart({ ...product, quantity: 1 });
      
    },
    viewDetails(productId) {
      this.$router.push(`/product/${productId}`);
    }
  }
};
</script>

<style scoped>
.banner {
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.product-card:hover {
  transform: translateY(-10px);
}
.category-item img {
  transition: transform 0.3s;
}
.category-item img:hover {
  transform: scale(1.05);
}
button {
  transition: background-color 0.3s ease;
}
</style>
