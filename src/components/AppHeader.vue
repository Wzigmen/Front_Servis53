<template>
  <header class="app-header">
    <div class="header-container">
      <router-link to="/" class="logo">
        <span class="logo-icon">🔧</span>
        <span class="logo-text">Сервис53</span>
      </router-link>

      <nav class="main-nav" :class="{ 'nav-open': isNavOpen }">
        <router-link to="/" class="nav-link" @click="closeNav">
          <span class="nav-icon">🏠</span>
          Главная
        </router-link>
        <router-link to="/services" class="nav-link" @click="closeNav">
          <span class="nav-icon">⚙️</span>
          Услуги
        </router-link>
        <router-link to="/shop" class="nav-link" @click="closeNav">
          <span class="nav-icon">🛒</span>
          Магазин
        </router-link>
        <router-link to="/contacts" class="nav-link" @click="closeNav">
          <span class="nav-icon">📞</span>
          Контакты
        </router-link>
      </nav>

      <div class="header-actions">
        <!-- Корзина -->
        <router-link to="/profile?tab=cart" class="cart-btn" @click="closeNav">
          <span class="cart-icon">🛒</span>
          <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
        </router-link>

        <!-- Кнопка входа / Профиль -->
        <button v-if="!currentUser" class="login-btn" @click="openAuthModal">
          Войти
        </button>
        <router-link v-else to="/profile" class="profile-btn" @click="closeNav">
          <div class="profile-avatar-small">
            {{ currentUser.name.charAt(0).toUpperCase() }}
          </div>
          <span class="profile-name">{{ currentUser.name }}</span>
        </router-link>
      </div>

      <button class="menu-toggle" @click="toggleNav" aria-label="Меню">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <AuthModal
      :is-open="showAuthModal"
      @close="showAuthModal = false"
      @login="handleLogin"
    />
  </header>
</template>

<script>
import AuthModal from './AuthModal.vue'

export default {
  name: 'AppHeader',
  components: {
    AuthModal
  },
  data() {
    return {
      isNavOpen: false,
      showAuthModal: false,
      currentUser: null,
      cartCount: 0
    }
  },
  created() {
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser)
    }

    // Загружаем количество товаров в корзине
    this.updateCartCount()

    // Слушаем события изменения пользователя
    window.addEventListener('storage', () => {
      const user = localStorage.getItem('currentUser')
      this.currentUser = user ? JSON.parse(user) : null
    })

    // Слушаем события обновления корзины
    window.addEventListener('cart-updated', this.updateCartCount)

    // Слушаем событие открытия модального окна авторизации
    window.addEventListener('open-auth-modal', this.openAuthModal)
  },
  methods: {
    updateCartCount() {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      this.cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
    },
    toggleNav() {
      this.isNavOpen = !this.isNavOpen
    },
    closeNav() {
      this.isNavOpen = false
    },
    openAuthModal() {
      this.showAuthModal = true
      this.closeNav()
    },
    handleLogin(user) {
      this.currentUser = user
      this.showAuthModal = false
      this.closeNav()
    }
  },
  mounted() {
    this.$root.$on('user-updated', () => {
      const user = localStorage.getItem('currentUser')
      this.currentUser = user ? JSON.parse(user) : null
    })
  },
  beforeUnmount() {
    this.$root.$off('user-updated')
    window.removeEventListener('cart-updated', this.updateCartCount)
    window.removeEventListener('open-auth-modal', this.openAuthModal)
  }
}
</script>

<style scoped>
.app-header {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 0 20px;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: white;
  font-size: 24px;
  font-weight: bold;
}

.logo-icon {
  font-size: 32px;
}

.logo-text {
  background: linear-gradient(135deg, #00d4ff 0%, #7b2cbf 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.main-nav {
  display: flex;
  gap: 30px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 6px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  color: white;
  background: rgba(255, 255, 255, 0.1);
}

.nav-link.router-link-active {
  color: #00d4ff;
  background: rgba(0, 212, 255, 0.1);
}

.nav-icon {
  font-size: 18px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.cart-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  text-decoration: none;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.cart-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.cart-icon {
  font-size: 22px;
}

.cart-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  color: white;
  min-width: 20px;
  height: 20px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 6px;
}

.login-btn {
  background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%);
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 212, 255, 0.4);
}

.profile-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  padding: 6px 12px;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.profile-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.profile-avatar-small {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00d4ff 0%, #7b2cbf 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
}

.profile-name {
  color: white;
  font-size: 14px;
  font-weight: 500;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
}

.menu-toggle span {
  width: 25px;
  height: 3px;
  background: white;
  border-radius: 3px;
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  .main-nav {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    flex-direction: column;
    gap: 0;
    padding: 20px;
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }

  .main-nav.nav-open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }

  .nav-link {
    padding: 15px 20px;
    border-radius: 10px;
  }

  .menu-toggle {
    display: flex;
  }

  .profile-name {
    display: none;
  }

  .header-actions {
    margin-right: 10px;
  }
}
</style>