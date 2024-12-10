<template>
  <div class="admin-page">
    <div class="admin-container flex">
      <AdminSidebar />
      <div class="admin-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import AdminSidebar from '../components/AdminSidebar.vue';

export default {
  name: 'AdminPage',
  components: {
    AdminSidebar
  }
};
</script>

<style scoped>
.admin-container {
  display: flex;
}
.admin-content {
  width: 100%;
  padding: 20px;
}
</style>
