<template>
  <div class="user-card">
    <div class="user-header">
      <div class="user-avatar">
        {{ user.name.charAt(0).toUpperCase() }}
      </div>
      <div class="user-info">
        <h3>{{ user.name }}</h3>
        <p class="user-email">{{ user.email }}</p>
      </div>
    </div>
    
    <div class="user-body">
      <div class="password-field">
        <span class="password-label">Пароль:</span>
        <span class="password-value">{{ showPassword ? user.pass : '••••••••' }}</span>
        <button 
          type="button" 
          class="toggle-password-btn"
          @click="showPassword = !showPassword"
        >
          {{ showPassword ? '👁' : '👁‍🗨' }}
        </button>
      </div>
    </div>
    
    <div class="user-footer">
      <button @click="deleteUser(index)" class="delete-btn">
        <span class="delete-icon">🗑</span>
        Удалить
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserCard',
  props: {
    user: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    deleteUser: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      showPassword: false
    }
  }
}
</script>

<style scoped>
.user-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid #e0e0e0;
}

.user-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.user-header {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  backdrop-filter: blur(10px);
}

.user-info h3 {
  margin: 0 0 4px;
  font-size: 18px;
  font-weight: 600;
}

.user-email {
  margin: 0;
  font-size: 13px;
  opacity: 0.9;
}

.user-body {
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.password-field {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f8f9fa;
  padding: 12px 16px;
  border-radius: 10px;
}

.password-label {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

.password-value {
  flex: 1;
  font-size: 14px;
  color: #333;
  font-family: monospace;
}

.toggle-password-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 4px;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.toggle-password-btn:hover {
  opacity: 1;
}

.user-footer {
  padding: 15px 20px;
  background: #f8f9fa;
}

.delete-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  background: #fef2f2;
  color: #ef4444;
  border: 1px solid #fecaca;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.delete-btn:hover {
  background: #ef4444;
  color: white;
  border-color: #dc2626;
  transform: translateY(-1px);
}

.delete-icon {
  font-size: 16px;
}

@media (max-width: 480px) {
  .user-header {
    padding: 15px;
  }
  
  .user-body,
  .user-footer {
    padding: 15px;
  }
}
</style>