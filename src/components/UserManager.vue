<template>
  <div class="user-manager">
    <h2 class="title">Quản lý người dùng</h2>
    <div class="stats">
      <p>Tổng số người dùng: {{ users.length }}</p>
      <p>Số lượng người truy cập hiện tại: {{ currentUserCount }}</p>
    </div>
    <table class="user-table">
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Role</th>
          <th>Thời gian truy cập</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.username">
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td>{{ formatTime(user.elapsedTime) }}</td>
          <td>
            <button @click="deleteUser(user.username)" class="delete-btn">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      users: JSON.parse(localStorage.getItem('users')) || [],
      currentUserCount: localStorage.getItem('currentUserCount') || 0,
    };
  },
  methods: {
    deleteUser(username) {
      this.users = this.users.filter(user => user.username !== username);
      localStorage.setItem('users', JSON.stringify(this.users));
    },
    formatTime(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      return `${hours}h ${minutes}m ${secs}s`;
    },
    startTracking() {
      this.users.forEach(user => {
        if (!user.elapsedTime) {
          user.elapsedTime = 0; 
        }
      });

      this.timer = setInterval(() => {
        this.users.forEach(user => {
          user.elapsedTime += 1; 
        });

        
        localStorage.setItem('users', JSON.stringify(this.users));
      }, 1000);
    },
  },
  mounted() {
    
    this.startTracking();
  },
  beforeUnmount() {
    
    clearInterval(this.timer);
  },
};
</script>
<style scoped>
.user-manager {
  background-color: #f3f4f6;
  padding: 20px;
  border-radius: 10px;
}
.title {
  font-size: 24px;
  margin-bottom: 20px;
}
.user-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
.user-table th, .user-table td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: left;
}
.user-table th {
  background-color: #1e293b;
  color: #fff;
}
.delete-btn {
  background-color: #ef4444;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}
.delete-btn:hover {
  background-color: #dc2626;
}
</style>
