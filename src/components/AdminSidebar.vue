<template>
  <div class="sidebar">
    <router-link to="/admin/products" class="sidebar-link">
      <i class="fas fa-box"></i> Quản lý sản phẩm
    </router-link>
    <router-link to="/admin/orders" class="sidebar-link">
      <i class="fas fa-shopping-cart"></i> Quản lý đơn hàng
    </router-link>
    <router-link to="/admin/users" class="sidebar-link">
      <i class="fas fa-users"></i> Quản lý người dùng
    </router-link>
  </div>
</template>

<style scoped>
.sidebar {
  width: 250px;
  background-color: #1e293b;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: 100vh;
}
.sidebar-link {
  display: flex;
  align-items: center;
  padding: 10px;
  color: #ffffff;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}
.sidebar-link i {
  margin-right: 10px;
}
.sidebar-link:hover {
  background-color: #3b82f6;
}
</style>
