<template>
  <div class="auth-container">
    <div class="auth-card">
      <!-- Заголовок -->
      <div class="auth-header">
        <h2>{{ isLoginMode ? 'Вход' : 'Регистрация' }}</h2>
        <p class="auth-subtitle">
          {{ isLoginMode 
            ? 'Добро пожаловать обратно!' 
            : 'Создайте аккаунт для начала работы' }}
        </p>
      </div>

      <!-- Форма -->
      <form @submit.prevent="handleSubmit" class="auth-form">
        <!-- Поле имени (только для регистрации) -->
        <div v-if="!isLoginMode" class="form-group">
          <label for="name">Имя пользователя</label>
          <div class="input-wrapper">
            <input
              id="name"
              v-model="form.name"
              type="text"
              placeholder="Введите ваше имя"
              :class="['form-input', { error: errors.name }]"
              @blur="validateName"
            />
            <span class="error-icon" v-if="errors.name">!</span>
          </div>
          <span class="error-message" v-if="errors.name">{{ errors.name }}</span>
        </div>

        <!-- Поле Email -->
        <div class="form-group">
          <label for="email">Email</label>
          <div class="input-wrapper">
            <input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="example@mail.ru"
              :class="['form-input', { error: errors.email }]"
              @blur="validateEmail"
            />
            <span class="error-icon" v-if="errors.email">!</span>
          </div>
          <span class="error-message" v-if="errors.email">{{ errors.email }}</span>
        </div>

        <!-- Поле пароля -->
        <div class="form-group">
          <label for="password">Пароль</label>
          <div class="input-wrapper">
            <input
              id="password"
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="••••••••"
              :class="['form-input', { error: errors.password }]"
              @blur="validatePassword"
            />
            <button
              type="button"
              class="toggle-password"
              @click="showPassword = !showPassword"
            >
              {{ showPassword ? '👁' : '👁‍🗨' }}
            </button>
            <span class="error-icon" v-if="errors.password">!</span>
          </div>
          <span class="error-message" v-if="errors.password">{{ errors.password }}</span>
          
          <!-- Индикатор сложности пароля (только для регистрации) -->
          <div v-if="!isLoginMode && form.password" class="password-strength">
            <div class="strength-bar">
              <div 
                class="strength-fill" 
                :class="passwordStrengthClass"
                :style="{ width: passwordStrength + '%' }"
              ></div>
            </div>
            <span class="strength-text">{{ passwordStrengthText }}</span>
          </div>
        </div>

        <!-- Поле подтверждения пароля (только для регистрации) -->
        <div v-if="!isLoginMode" class="form-group">
          <label for="passwordConfirm">Подтвердите пароль</label>
          <div class="input-wrapper">
            <input
              id="passwordConfirm"
              v-model="form.passwordConfirm"
              :type="showPasswordConfirm ? 'text' : 'password'"
              placeholder="••••••••"
              :class="['form-input', { error: errors.passwordConfirm }]"
              @blur="validatePasswordConfirm"
            />
            <button
              type="button"
              class="toggle-password"
              @click="showPasswordConfirm = !showPasswordConfirm"
            >
              {{ showPasswordConfirm ? '👁' : '👁‍🗨' }}
            </button>
            <span class="error-icon" v-if="errors.passwordConfirm">!</span>
          </div>
          <span class="error-message" v-if="errors.passwordConfirm">
            {{ errors.passwordConfirm }}
          </span>
        </div>

        <!-- Сообщение об ошибке -->
        <div v-if="submitError" class="submit-error">
          {{ submitError }}
        </div>

        <!-- Кнопка отправки -->
        <button type="submit" class="submit-btn" :disabled="isLoading">
          {{ isLoading ? 'Загрузка...' : (isLoginMode ? 'Войти' : 'Зарегистрироваться') }}
        </button>
      </form>

      <!-- Переключатель режима -->
      <div class="auth-switch">
        <span>{{ isLoginMode ? 'Нет аккаунта?' : 'Уже есть аккаунт?' }}</span>
        <button 
          type="button" 
          class="switch-btn"
          @click="toggleMode"
        >
          {{ isLoginMode ? 'Зарегистрироваться' : 'Войти' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthForm',
  data() {
    return {
      isLoginMode: true,
      showPassword: false,
      showPasswordConfirm: false,
      isLoading: false,
      submitError: '',
      form: {
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
      },
      errors: {
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
      }
    }
  },
  computed: {
    passwordStrength() {
      const password = this.form.password;
      if (!password) return 0;
      
      let strength = 0;
      if (password.length >= 6) strength += 25;
      if (password.length >= 8) strength += 25;
      if (/[A-Z]/.test(password)) strength += 25;
      if (/[0-9!@#$%^&*]/.test(password)) strength += 25;
      
      return strength;
    },
    passwordStrengthClass() {
      const strength = this.passwordStrength;
      if (strength <= 25) return 'weak';
      if (strength <= 50) return 'fair';
      if (strength <= 75) return 'good';
      return 'strong';
    },
    passwordStrengthText() {
      const strength = this.passwordStrength;
      if (strength <= 25) return 'Слабый';
      if (strength <= 50) return 'Средний';
      if (strength <= 75) return 'Хороший';
      return 'Отличный';
    }
  },
  methods: {
    validateName() {
      const name = this.form.name.trim();
      if (!name) {
        this.errors.name = 'Имя обязательно для заполнения';
        return false;
      }
      if (name.length < 2) {
        this.errors.name = 'Имя должно быть не менее 2 символов';
        return false;
      }
      if (name.length > 50) {
        this.errors.name = 'Имя не должно превышать 50 символов';
        return false;
      }
      this.errors.name = '';
      return true;
    },
    validateEmail() {
      const email = this.form.email.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (!email) {
        this.errors.email = 'Email обязателен для заполнения';
        return false;
      }
      if (!emailRegex.test(email)) {
        this.errors.email = 'Введите корректный email адрес';
        return false;
      }
      this.errors.email = '';
      return true;
    },
    validatePassword() {
      const password = this.form.password;
      
      if (!password) {
        this.errors.password = 'Пароль обязателен для заполнения';
        return false;
      }
      if (password.length < 6) {
        this.errors.password = 'Пароль должен содержать не менее 6 символов';
        return false;
      }
      if (password.length > 100) {
        this.errors.password = 'Пароль не должен превышать 100 символов';
        return false;
      }
      this.errors.password = '';
      return true;
    },
    validatePasswordConfirm() {
      const confirm = this.form.passwordConfirm;
      const password = this.form.password;
      
      if (!confirm) {
        this.errors.passwordConfirm = 'Подтвердите пароль';
        return false;
      }
      if (confirm !== password) {
        this.errors.passwordConfirm = 'Пароли не совпадают';
        return false;
      }
      this.errors.passwordConfirm = '';
      return true;
    },
    validateForm() {
      let isValid = true;
      
      if (!this.isLoginMode) {
        if (!this.validateName()) isValid = false;
      }
      
      if (!this.validateEmail()) isValid = false;
      if (!this.validatePassword()) isValid = false;
      
      if (!this.isLoginMode) {
        if (!this.validatePasswordConfirm()) isValid = false;
      }
      
      return isValid;
    },
    async handleSubmit() {
      this.submitError = '';
      
      if (!this.validateForm()) {
        return;
      }
      
      this.isLoading = true;
      
      try {
        // Имитация задержки сети
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (this.isLoginMode) {
          // Логика входа
          const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
          const user = storedUsers.find(
            u => u.email === this.form.email && u.password === this.form.password
          );
          
          if (!user) {
            this.submitError = 'Неверный email или пароль';
            return;
          }
          
          // Сохраняем текущего пользователя
          localStorage.setItem('currentUser', JSON.stringify({
            name: user.name,
            email: user.email
          }));
          
          this.$emit('login', user);
          
        } else {
          // Логика регистрации
          const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
          
          // Проверяем, существует ли пользователь с таким email
          if (storedUsers.some(u => u.email === this.form.email)) {
            this.submitError = 'Пользователь с таким email уже существует';
            return;
          }
          
          // Создаем нового пользователя
          const newUser = {
            name: this.form.name.trim(),
            email: this.form.email.trim(),
            password: this.form.password, // В реальном приложении здесь должен быть хеш!
            createdAt: new Date().toISOString()
          };
          
          storedUsers.push(newUser);
          localStorage.setItem('users', JSON.stringify(storedUsers));
          
          // Автоматически входим после регистрации
          localStorage.setItem('currentUser', JSON.stringify({
            name: newUser.name,
            email: newUser.email
          }));
          
          this.$emit('register', newUser);
        }
        
        // Очищаем форму
        this.form = {
          name: '',
          email: '',
          password: '',
          passwordConfirm: ''
        };
        
      } catch (error) {
        this.submitError = 'Произошла ошибка. Попробуйте позже.';
        console.error('Auth error:', error);
      } finally {
        this.isLoading = false;
      }
    },
    toggleMode() {
      this.isLoginMode = !this.isLoginMode;
      this.submitError = '';
      this.errors = {
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
      };
    }
  }
}
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.auth-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  padding: 40px;
  width: 100%;
  max-width: 420px;
  animation: slideUp 0.5s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.auth-header {
  text-align: center;
  margin-bottom: 30px;
}

.auth-header h2 {
  margin: 0 0 10px;
  color: #333;
  font-size: 28px;
  font-weight: 600;
}

.auth-subtitle {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 14px;
  transition: all 0.3s ease;
  outline: none;
  padding-right: 40px;
}

.form-input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-input.error {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.form-input::placeholder {
  color: #999;
}

.error-icon {
  position: absolute;
  right: 12px;
  width: 20px;
  height: 20px;
  background: #ef4444;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}

.error-message {
  font-size: 12px;
  color: #ef4444;
  margin-top: 2px;
}

.toggle-password {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 4px;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.toggle-password:hover {
  opacity: 1;
}

.password-strength {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 8px;
}

.strength-bar {
  flex: 1;
  height: 4px;
  background: #e0e0e0;
  border-radius: 2px;
  overflow: hidden;
}

.strength-fill {
  height: 100%;
  transition: all 0.3s ease;
  border-radius: 2px;
}

.strength-fill.weak {
  background: #ef4444;
  width: 25%;
}

.strength-fill.fair {
  background: #f59e0b;
  width: 50%;
}

.strength-fill.good {
  background: #10b981;
  width: 75%;
}

.strength-fill.strong {
  background: #3b82f6;
  width: 100%;
}

.strength-text {
  font-size: 12px;
  color: #666;
  min-width: 60px;
}

.submit-error {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
}

.submit-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 14px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.auth-switch {
  text-align: center;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #e0e0e0;
}

.auth-switch span {
  color: #666;
  font-size: 14px;
}

.switch-btn {
  background: none;
  border: none;
  color: #667eea;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
  margin-left: 5px;
  transition: color 0.2s;
}

.switch-btn:hover {
  color: #764ba2;
  text-decoration: underline;
}

@media (max-width: 480px) {
  .auth-card {
    padding: 30px 20px;
  }
  
  .auth-header h2 {
    font-size: 24px;
  }
}
</style>