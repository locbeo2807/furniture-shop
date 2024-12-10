<template>
  <div class="cart-page bg-gray-100 py-16 min-h-screen">
    <!-- Banner -->
    <div class="banner relative h-64 flex items-center justify-center mb-10">
      <div class="banner-background absolute inset-0"></div>
      <div class="relative z-10 text-center">
        <h1 class="text-5xl font-bold text-gray-900">Cart</h1>
        <p class="text-gray-600 text-sm mt-2">Home &gt; Cart</p>
      </div>
    </div>

    <!-- Nội dung giỏ hàng -->
    <div class="max-w-screen-lg mx-auto bg-white p-10 rounded-lg shadow-lg">
      <h2 class="text-3xl font-bold mb-10 text-center">Your Shopping Cart</h2>

      <div v-if="cartItems.length > 0" class="flex flex-col lg:flex-row gap-12">
        <div class="flex-1">
          <div
            v-for="(item, index) in cartItems"
            :key="index"
            class="cart-item flex items-center mb-6 p-4 border-b"
          >
            <img
              :src="item.preview_image"
              alt="Product"
              class="w-24 h-24 rounded-lg object-cover mr-6"
            />
            <div class="flex-1">
              <h3 class="text-xl font-semibold">{{ item.name }}</h3>
              <p class="text-gray-500">
                {{ item.quantity }} x {{ item.price.toLocaleString() }} VND
              </p>
            </div>
            <div class="flex items-center">
              <button
                @click="decreaseQuantity(item)"
                class="bg-gray-200 text-gray-800 px-3 py-1 rounded-l-lg hover:bg-gray-300"
              >
                -
              </button>
              <input
                type="text"
                v-model.number="item.quantity"
                class="w-12 text-center border-t border-b"
                readonly
              />
              <button
                @click="increaseQuantity(item)"
                class="bg-gray-200 text-gray-800 px-3 py-1 rounded-r-lg hover:bg-gray-300"
              >
                +
              </button>
              <button
                @click="handleRemoveItem(item.id)"
                class="ml-4 text-red-500 hover:text-red-700"
              >
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Cart Summary -->
        <div class="cart-summary bg-gray-50 p-6 rounded-lg shadow-md">
          <h3 class="text-2xl font-bold mb-4">Cart Totals</h3>
          <p class="flex justify-between border-b py-2 text-lg">
            <span>Subtotal</span>
            <span>{{ formattedTotal }}.000</span>
          </p>
          <button
            @click="$router.push('/checkout')"
            class="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-12 rounded-lg w-full mt-6"
          >
            Check Out
          </button>
        </div>
      </div>

      <!-- Giỏ hàng trống -->
      <div v-else class="text-center py-20">
        <p class="text-gray-700 text-lg">Your cart is empty.</p>
        <router-link to="/shop" class="text-blue-600 hover:underline"
          >Continue shopping</router-link
        >
      </div>
    </div>

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
  </div>
</template>

<script>
import { computed } from "vue";
import { authState, removeFromCart } from "../auth";

export default {
  setup() {
    const cartItems = authState.cartItems;

    const formattedTotal = computed(() => {
      const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      return `₫${total.toLocaleString("vi-VN")}`;
    });

    const increaseQuantity = (item) => {
      item.quantity++;
      updateCart();
    };

    const decreaseQuantity = (item) => {
      if (item.quantity > 1) {
        item.quantity--;
        updateCart();
      }
    };

    const updateCart = () => {
      localStorage.setItem("cartItems", JSON.stringify(authState.cartItems));
    };

    const handleRemoveItem = (id) => {
      removeFromCart(id);
    };

    const checkout = () => {
      // Điều hướng đến trang thanh toán
      this.$router.push("/checkout");
    };

    return {
      cartItems,
      formattedTotal,
      increaseQuantity,
      decreaseQuantity,
      handleRemoveItem,
      checkout,
    };
  },
};
</script>

<style scoped>
.banner {
  position: relative;
  overflow: hidden;
  background-image: url("https://s3-alpha-sig.figma.com/img/1461/f3d6/ff74c027a1888544144abe4be6e02cbf?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ghTagDUzYeij86XyXDpP8Hboj7iUkkJyBUTToHtiRGxu6prrmRYK~KbMwyMFJXJM1MOMZ7cHie~atWrOPBcx1l1hrnDBd-aiVaWloxyb-odaa0CVD5GnSXT1aNW9XUGPr7~DwmuVXhicMyTdQeJMVnorVn1YWhwWMLUcfi5TKOxK98yIQ9eQfyP8DK7LkwMkgymXVVDiUDL0uiO141OOqU62tD0qAL-CjLxYM44gMsFjAkbv5cdM-CnmonBmYFo6T7FFbeOwQhj4WNlFjCdAV~5fR9arn22ctdZzP-WJAhrUKfxyi8Yw7lEqrfWl1hBoMwp3a9UBszC7PPaPtbCmZQ__");
  background-size: cover;
  background-position: center;
}

.banner-background {
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  inset: 0;
}

.cart-summary {
  min-width: 300px;
}

.features {
  background-color: #fdf3e3;
}

.feature-item i {
  transition: transform 0.3s ease;
}

.feature-item:hover i {
  transform: scale(1.1);
}
</style>
