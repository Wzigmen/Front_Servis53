<template>
  <div class="auth-modal-overlay" v-if="isOpen" @click.self="closeModal">
    <div class="auth-modal">
      <button class="close-btn" @click="closeModal">×</button>

      <div class="auth-tabs">
        <button
          class="tab-btn"
          :class="{ active: activeTab === 'login' }"
          @click="activeTab = 'login'"
        >
          Вход
        </button>
        <button
          class="tab-btn"
          :class="{ active: activeTab === 'register' }"
          @click="activeTab = 'register'"
        >
          Регистрация
        </button>
      </div>

      <!-- Форма входа -->
      <form v-if="activeTab === 'login'" @submit.prevent="handleLogin" class="auth-form">
        <h2>Вход в аккаунт</h2>

        <div class="form-group">
          <label for="loginEmail">Email</label>
          <input
            id="loginEmail"
            v-model="loginForm.email"
            type="email"
            placeholder="example@mail.ru"
            :class="{ error: errors.email }"
            required
          />
          <span class="error-message" v-if="errors.email">{{ errors.email }}</span>
        </div>

        <div class="form-group">
          <label for="loginPassword">Пароль</label>
          <input
            id="loginPassword"
            v-model="loginForm.password"
            type="password"
            placeholder="••••••••"
            :class="{ error: errors.password }"
            required
          />
          <span class="error-message" v-if="errors.password">{{ errors.password }}</span>
        </div>

        <button type="submit" class="submit-btn">Войти</button>
      </form>

      <!-- Форма регистрации -->
      <form v-else @submit.prevent="handleRegister" class="auth-form">
        <h2>Регистрация</h2>

        <div class="form-group">
          <label for="registerName">Имя</label>
          <input
            id="registerName"
            v-model="registerForm.name"
            type="text"
            placeholder="Иван Иванов"
            :class="{ error: errors.name }"
            required
          />
          <span class="error-message" v-if="errors.name">{{ errors.name }}</span>
        </div>

        <div class="form-group">
          <label for="registerEmail">Email</label>
          <input
            id="registerEmail"
            v-model="registerForm.email"
            type="email"
            placeholder="example@mail.ru"
            :class="{ error: errors.email }"
            required
          />
          <span class="error-message" v-if="errors.email">{{ errors.email }}</span>
        </div>

        <div class="form-group">
          <label for="registerPassword">Пароль</label>
          <input
            id="registerPassword"
            v-model="registerForm.password"
            type="password"
            placeholder="••••••••"
            :class="{ error: errors.password }"
            required
          />
          <span class="error-message" v-if="errors.password">{{ errors.password }}</span>
        </div>

        <div class="form-group">
          <label for="registerConfirm">Подтвердите пароль</label>
          <input
            id="registerConfirm"
            v-model="registerForm.confirm"
            type="password"
            placeholder="••••••••"
            :class="{ error: errors.confirm }"
            required
          />
          <span class="error-message" v-if="errors.confirm">{{ errors.confirm }}</span>
        </div>

        <button type="submit" class="submit-btn">Зарегистрироваться</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthModal',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeTab: 'login',
      loginForm: {
        email: '',
        password: ''
      },
      registerForm: {
        name: '',
        email: '',
        password: '',
        confirm: ''
      },
      errors: {}
    }
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        this.activeTab = 'login'
        this.resetForms()
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    resetForms() {
      this.loginForm = { email: '', password: '' }
      this.registerForm = { name: '', email: '', password: '', confirm: '' }
      this.errors = {}
    },
    validateLogin() {
      this.errors = {}
      let isValid = true

      if (!this.loginForm.email.trim()) {
        this.errors.email = 'Введите email'
        isValid = false
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.loginForm.email)) {
        this.errors.email = 'Введите корректный email'
        isValid = false
      }

      if (!this.loginForm.password) {
        this.errors.password = 'Введите пароль'
        isValid = false
      } else if (this.loginForm.password.length < 6) {
        this.errors.password = 'Пароль должен быть не менее 6 символов'
        isValid = false
      }

      return isValid
    },
    validateRegister() {
      this.errors = {}
      let isValid = true

      if (!this.registerForm.name.trim()) {
        this.errors.name = 'Введите имя'
        isValid = false
      } else if (this.registerForm.name.trim().length < 2) {
        this.errors.name = 'Имя должно быть не менее 2 символов'
        isValid = false
      }

      if (!this.registerForm.email.trim()) {
        this.errors.email = 'Введите email'
        isValid = false
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.registerForm.email)) {
        this.errors.email = 'Введите корректный email'
        isValid = false
      }

      if (!this.registerForm.password) {
        this.errors.password = 'Введите пароль'
        isValid = false
      } else if (this.registerForm.password.length < 6) {
        this.errors.password = 'Пароль должен быть не менее 6 символов'
        isValid = false
      }

      if (this.registerForm.password !== this.registerForm.confirm) {
        this.errors.confirm = 'Пароли не совпадают'
        isValid = false
      }

      return isValid
    },
    handleLogin() {
      if (!this.validateLogin()) return

      // Проверяем, есть ли пользователь с таким email
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const user = users.find(u => u.email === this.loginForm.email && u.pass === this.loginForm.password)

      if (user) {
        const loggedInUser = { name: user.name, email: user.email }
        localStorage.setItem('currentUser', JSON.stringify(loggedInUser))
        this.$emit('login', loggedInUser)
        this.closeModal()
      } else {
        this.errors.email = 'Пользователь не найден'
        this.errors.password = 'Неверный email или пароль'
      }
    },
    handleRegister() {
      if (!this.validateRegister()) return

      const users = JSON.parse(localStorage.getItem('users') || '[]')

      // Проверяем, есть ли уже пользователь с таким email
      if (users.some(u => u.email === this.registerForm.email)) {
        this.errors.email = 'Пользователь с таким email уже существует'
        return
      }

      // Добавляем нового пользователя
      const newUser = {
        name: this.registerForm.name.trim(),
        email: this.registerForm.email.trim(),
        pass: this.registerForm.password
      }
      users.push(newUser)
      localStorage.setItem('users', JSON.stringify(users))

      // Автоматически авторизуем
      const loggedInUser = { name: newUser.name, email: newUser.email }
      localStorage.setItem('currentUser', JSON.stringify(loggedInUser))
      this.$emit('login', loggedInUser)
      this.closeModal()
    }
  }
}
</script>

<style scoped>
.auth-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.auth-modal {
  background: white;
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  max-width: 420px;
  position: relative;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 28px;
  color: #999;
  cursor: pointer;
  transition: color 0.3s;
  line-height: 1;
}

.close-btn:hover {
  color: #333;
}

.auth-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
}

.tab-btn {
  flex: 1;
  padding: 12px;
  border: 2px solid #e0e0e0;
  background: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
}

.tab-btn.active {
  border-color: #00d4ff;
  color: #00d4ff;
  background: rgba(0, 212, 255, 0.05);
}

.tab-btn:hover:not(.active) {
  border-color: #ccc;
  color: #333;
}

.auth-form h2 {
  font-size: 24px;
  color: #1a1a2e;
  margin-bottom: 25px;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 6px;
}

.form-group input {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 15px;
  transition: border-color 0.3s;
  outline: none;
}

.form-group input:focus {
  border-color: #00d4ff;
}

.form-group input.error {
  border-color: #ef4444;
}

.error-message {
  font-size: 12px;
  color: #ef4444;
  margin-top: 4px;
}

.submit-btn {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 10px;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 212, 255, 0.4);
}

@media (max-width: 480px) {
  .auth-modal {
    padding: 30px 20px;
  }
}
</style>