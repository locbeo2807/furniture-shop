<template>
  <div class="signup-page max-w-lg mx-auto mt-16 bg-white p-8 rounded-lg shadow-lg">
    <h1 class="text-3xl font-bold text-center mb-6">Sign Up</h1>
    <form @submit.prevent="handleSignup">
      <div class="mb-4">
        <label class="block mb-2 text-gray-700">Username</label>
        <input v-model="username" type="text" class="w-full border rounded-lg py-2 px-3" required />
      </div>
      
      <div class="mb-4">
        <label class="block mb-2 text-gray-700">Email</label>
        <input v-model="email" type="email" class="w-full border rounded-lg py-2 px-3" required />
      </div>
      
      <div class="mb-4">
        <label class="block mb-2 text-gray-700">Password</label>
        <input v-model="password" type="password" class="w-full border rounded-lg py-2 px-3" required />
      </div>

      <div v-if="errorMessage" class="text-red-500 mb-4">{{ errorMessage }}</div>
      <div v-if="successMessage" class="text-green-500 mb-4">{{ successMessage }}</div>
      
      <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg">Sign Up</button>
    </form>
  </div>
</template>

<script>
import { signup } from '../auth';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      errorMessage: '',
      successMessage: ''
    };
  },
  methods: {
  handleSignup() {
    const success = signup(this.username, this.password, this.email);
    if (success) {
      this.successMessage = 'Registration successful! Redirecting to login...';

      // Reset dữ liệu trong form đăng ký
      this.username = '';
      this.password = '';
      this.email = '';

      setTimeout(() => {
        this.$router.push('/login'); // Chuyển hướng tới trang đăng nhập
      }, 1500);
    } else {
      this.errorMessage = 'Username or email already exists. Please try again.';
    }
  },
}

};
</script>

<style scoped>
.signup-page {
  max-width: 400px;
}
</style>
