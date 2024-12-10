<template>
  <div>
    <!-- Header -->
    <AppHeader />
    
    <!-- Nội dung trang dựa trên điều hướng -->
    <main class="container mx-auto p-4">
      <router-view />
    </main>
    
    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";

export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter
  },
};
</script>
