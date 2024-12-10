<template>
  <div
    class="login-page max-w-lg mx-auto mt-16 bg-white p-8 rounded-lg shadow-lg"
  >
    <h1 class="text-3xl font-bold text-center mb-6">Log In</h1>
    <form @submit.prevent="handleLogin">
      <div class="mb-4">
        <label class="block text-gray-700 mb-2">Username</label>
        <input
          v-model="username"
          type="text"
          placeholder="Enter your username"
          class="w-full border rounded-lg py-2 px-3"
          autocomplete="off"
          required
        />
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 mb-2">Password</label>
        <input
          v-model="password"
          type="password"
          placeholder="Enter your password"
          class="w-full border rounded-lg py-2 px-3"
          autocomplete="new-password"
          required
        />
      </div>
      <div v-if="errorMessage" class="text-red-500 mb-4">
        {{ errorMessage }}
      </div>
      <div v-if="successMessage" class="text-green-500 mb-4">
        {{ successMessage }}
      </div>
      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
      >
        Log In
      </button>
    </form>
  </div>
</template>

<script>
import { login, getCurrentUser } from "../auth";

export default {
  data() {
    return {
      username: "", // Giá trị nhập từ trường username
      password: "", // Giá trị nhập từ trường password
      errorMessage: "", // Lưu thông báo lỗi
      successMessage: "", // Lưu thông báo thành công
    };
  },
  methods: {
    handleLogin() {
      // Kiểm tra nếu username và password đều không được nhập
      if (!this.username.trim() || !this.password.trim()) {
        this.errorMessage = "Please fill in all fields.";
        return;
      }

      // Gọi hàm login từ auth.js
      const success = login(this.username, this.password);

      if (success) {
        const currentUser = getCurrentUser();
        this.successMessage = "Login successful! Redirecting...";

        // Reset thông báo lỗi nếu có
        this.errorMessage = "";

        // Chuyển hướng dựa trên vai trò của người dùng
        setTimeout(() => {
          if (currentUser.role === "admin") {
            this.$router.push("/admin/dashboard"); // Nếu là admin
          } else {
            this.$router.push("/"); // Nếu là user
          }
        }, 1500); // Thời gian hiển thị thông báo trước khi chuyển trang
      } else {
        // Thông báo lỗi nếu đăng nhập thất bại
        this.errorMessage = "Invalid username or password. Please try again.";
        this.successMessage = "";
      }
    },
  },
  mounted() {
    // Khi giao diện đăng nhập được load, reset trường nhập liệu
    this.username = "";
    this.password = "";
    this.errorMessage = "";
    this.successMessage = "";
  },
};
</script>
