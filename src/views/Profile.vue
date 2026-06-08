<template>
  <div class="profile-page">
    <div class="container">
      <h1 class="page-title">Личный кабинет</h1>

      <!-- Вкладки -->
      <div class="tabs">
        <button
          class="tab-btn"
          :class="{ active: activeTab === 'info' }"
          @click="activeTab = 'info'"
        >
          Информация
        </button>
        <button
          class="tab-btn"
          :class="{ active: activeTab === 'cart' }"
          @click="activeTab = 'cart'"
        >
          Корзина
          <span v-if="cartItems.length > 0" class="tab-badge">{{ cartItems.length }}</span>
        </button>
        <button
          class="tab-btn"
          :class="{ active: activeTab === 'orders' }"
          @click="activeTab = 'orders'"
        >
          Заказы
        </button>
      </div>

      <!-- Вкладка: Информация -->
      <div v-if="activeTab === 'info'" class="tab-content">
        <div class="profile-grid">
          <div class="profile-card">
            <div class="profile-header">
              <div class="profile-avatar">
                {{ user.name.charAt(0).toUpperCase() }}
              </div>
              <h2>{{ user.name }}</h2>
              <p class="profile-email">{{ user.email }}</p>
            </div>

            <div class="profile-stats">
              <div class="stat-item">
                <span class="stat-value">{{ orders.length }}</span>
                <span class="stat-label">Заказов</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">{{ cartItems.reduce((sum, item) => sum + item.quantity, 0) }}</span>
                <span class="stat-label">Товаров в корзине</span>
              </div>
            </div>

            <div class="profile-actions">
              <button class="btn btn-secondary" @click="showEditModal = true">
                Редактировать профиль
              </button>
              <button class="btn btn-danger" @click="logout">
                Выйти
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Вкладка: Корзина -->
      <div v-if="activeTab === 'cart'" class="tab-content">
        <div class="cart-card">
          <h3>Корзина</h3>

          <div v-if="cartItems.length === 0" class="empty-cart">
            <span class="empty-icon">🛒</span>
            <p>Ваша корзина пуста</p>
            <router-link to="/shop" class="btn btn-primary">Перейти в магазин</router-link>
          </div>

          <div v-else class="cart-content">
            <div class="cart-items">
              <div class="cart-item" v-for="(item, index) in cartItems" :key="item.id">
                <div class="item-image">
                  <span>{{ item.emoji }}</span>
                </div>
                <div class="item-info">
                  <h4>{{ item.name }}</h4>
                  <p class="item-price">{{ item.price.toLocaleString() }} ₽</p>
                </div>
                <div class="item-quantity">
                  <button class="qty-btn" @click="updateQuantity(index, -1)">−</button>
                  <span class="qty-value">{{ item.quantity }}</span>
                  <button class="qty-btn" @click="updateQuantity(index, 1)">+</button>
                </div>
                <div class="item-total">
                  {{ (item.price * item.quantity).toLocaleString() }} ₽
                </div>
                <button class="remove-btn" @click="removeFromCart(index)">×</button>
              </div>
            </div>

            <div class="cart-summary">
              <div class="summary-row">
                <span>Товаров:</span>
                <span>{{ cartItems.reduce((sum, item) => sum + item.quantity, 0) }}</span>
              </div>
              <div class="summary-row total">
                <span>Итого:</span>
                <span>{{ cartTotal.toLocaleString() }} ₽</span>
              </div>
              <button class="btn btn-primary checkout-btn" @click="checkout">
                Оформить заказ
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Вкладка: Заказы -->
      <div v-if="activeTab === 'orders'" class="tab-content">
        <div class="orders-card">
          <h3>История заказов</h3>

          <div v-if="orders.length === 0" class="no-orders">
            <span class="no-orders-icon">📦</span>
            <p>У вас пока нет заказов</p>
            <router-link to="/shop" class="btn btn-primary">Перейти в магазин</router-link>
          </div>

          <div v-else class="orders-list">
            <div class="order-item" v-for="order in orders" :key="order.id">
              <div class="order-header">
                <span class="order-id">№{{ order.id }}</span>
                <span class="order-date">{{ order.date }}</span>
                <span class="order-status">{{ order.status }}</span>
              </div>
              <div class="order-items">
                <div class="order-product" v-for="item in order.items" :key="item.id">
                  <span>{{ item.emoji }} {{ item.name }} × {{ item.quantity }}</span>
                </div>
              </div>
              <div class="order-total">
                Итого: {{ order.total.toLocaleString() }} ₽
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Модальное окно редактирования -->
      <div class="edit-modal-overlay" v-if="showEditModal" @click.self="showEditModal = false">
        <div class="edit-modal">
          <button class="close-btn" @click="showEditModal = false">×</button>
          <h2>Редактировать профиль</h2>

          <form @submit.prevent="saveProfile" class="edit-form">
            <div class="form-group">
              <label for="editName">Имя</label>
              <input
                id="editName"
                v-model="editForm.name"
                type="text"
                placeholder="Введите имя"
                :class="{ error: editErrors.name }"
              />
              <span class="error-message" v-if="editErrors.name">{{ editErrors.name }}</span>
            </div>

            <div class="form-group">
              <label for="editEmail">Email</label>
              <input
                id="editEmail"
                v-model="editForm.email"
                type="email"
                placeholder="Введите email"
                :class="{ error: editErrors.email }"
              />
              <span class="error-message" v-if="editErrors.email">{{ editErrors.email }}</span>
            </div>

            <div class="form-group">
              <label for="editPhone">Телефон</label>
              <input
                id="editPhone"
                v-model="editForm.phone"
                type="tel"
                placeholder="+7 (999) 123-45-67"
              />
            </div>

            <div class="form-actions">
              <button type="button" class="btn btn-secondary" @click="showEditModal = false">
                Отмена
              </button>
              <button type="submit" class="btn btn-primary">
                Сохранить
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  data() {
    return {
      user: { name: '', email: '' },
      cartItems: [],
      orders: [],
      activeTab: 'info',
      showEditModal: false,
      editForm: {
        name: '',
        email: '',
        phone: ''
      },
      editErrors: {}
    }
  },
  computed: {
    cartTotal() {
      return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    }
  },
  watch: {
    '$route.query.tab'(tab) {
      if (tab === 'cart') {
        this.activeTab = 'cart'
      } else {
        this.activeTab = tab || 'info'
      }
    }
  },
  created() {
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      this.user = JSON.parse(savedUser)
      this.editForm.name = this.user.name
      this.editForm.email = this.user.email
    } else {
      alert('Для просмотра корзины необходимо войти в аккаунт.')
      this.$router.push('/')
    }

    // Загружаем корзину
    this.loadCart()

    // Загружаем заказы
    this.loadOrders()

    // Проверяем, есть ли параметр tab в URL
    if (this.$route.query.tab === 'cart') {
      this.activeTab = 'cart'
    }

    // Слушаем обновления корзины
    window.addEventListener('cart-updated', this.loadCart)
  },
  methods: {
    loadCart() {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      this.cartItems = cart
    },
    loadOrders() {
      const orders = JSON.parse(localStorage.getItem('userOrders') || '[]')
      this.orders = orders
    },
    updateQuantity(index, change) {
      const newItem = { ...this.cartItems[index] }
      newItem.quantity += change

      if (newItem.quantity <= 0) {
        this.removeFromCart(index)
        return
      }

      this.cartItems[index] = newItem
      localStorage.setItem('cart', JSON.stringify(this.cartItems))
      window.dispatchEvent(new Event('cart-updated'))
    },
    removeFromCart(index) {
      if (confirm('Удалить товар из корзины?')) {
        const newCart = [...this.cartItems]
        newCart.splice(index, 1)
        this.cartItems = newCart
        localStorage.setItem('cart', JSON.stringify(this.cartItems))
        window.dispatchEvent(new Event('cart-updated'))
      }
    },
    checkout() {
      if (this.cartItems.length === 0) return

      if (!confirm(`Оформить заказ на сумму ${this.cartTotal.toLocaleString()} ₽?`)) {
        return
      }

      // Создаем новый заказ
      const newOrder = {
        id: Date.now().toString().slice(-6),
        date: new Date().toLocaleDateString('ru-RU'),
        status: 'В обработке',
        items: [...this.cartItems],
        total: this.cartTotal
      }

      // Сохраняем заказ
      const orders = JSON.parse(localStorage.getItem('userOrders') || '[]')
      orders.push(newOrder)
      localStorage.setItem('userOrders', JSON.stringify(orders))

      // Очищаем корзину
      this.cartItems = []
      localStorage.setItem('cart', JSON.stringify([]))
      window.dispatchEvent(new Event('cart-updated'))

      // Обновляем список заказов
      this.loadOrders()

      // Переключаемся на вкладку заказов
      this.activeTab = 'orders'

      alert('Заказ успешно оформлен!\nМенеджер свяжется с вами в ближайшее время.')
    },
    validateEditForm() {
      this.editErrors = {}
      let isValid = true

      if (!this.editForm.name.trim()) {
        this.editErrors.name = 'Введите имя'
        isValid = false
      } else if (this.editForm.name.trim().length < 2) {
        this.editErrors.name = 'Имя должно быть не менее 2 символов'
        isValid = false
      }

      if (!this.editForm.email.trim()) {
        this.editErrors.email = 'Введите email'
        isValid = false
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.editForm.email)) {
        this.editErrors.email = 'Введите корректный email'
        isValid = false
      }

      return isValid
    },
    saveProfile() {
      if (!this.validateEditForm()) return

      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const userIndex = users.findIndex(u => u.email === this.user.email)

      if (userIndex !== -1) {
        if (this.editForm.email !== this.user.email && users.some(u => u.email === this.editForm.email)) {
          this.editErrors.email = 'Такой email уже занят'
          return
        }

        users[userIndex].name = this.editForm.name.trim()
        users[userIndex].email = this.editForm.email.trim()
        localStorage.setItem('users', JSON.stringify(users))
      }

      this.user = { name: this.editForm.name.trim(), email: this.editForm.email.trim() }
      localStorage.setItem('currentUser', JSON.stringify(this.user))

      this.showEditModal = false
      alert('Профиль успешно обновлен!')
    },
    logout() {
      if (confirm('Вы уверены, что хотите выйти?')) {
        localStorage.removeItem('currentUser')
        this.$router.push('/')
      }
    }
  },
  beforeUnmount() {
    window.removeEventListener('cart-updated', this.loadCart)
  }
}
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  background: #f8f9fa;
  padding: 40px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-title {
  font-size: 42px;
  text-align: center;
  color: #1a1a2e;
  margin-bottom: 30px;
}

/* Вкладки */
.tabs {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 40px;
}

.tab-btn {
  padding: 14px 32px;
  border: 2px solid #e0e0e0;
  background: white;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
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

.tab-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  color: white;
  min-width: 22px;
  height: 22px;
  border-radius: 11px;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tab-content {
  max-width: 900px;
  margin: 0 auto;
}

/* Профиль */
.profile-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
}

.profile-card {
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  text-align: center;
}

.profile-header {
  margin-bottom: 30px;
}

.profile-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00d4ff 0%, #7b2cbf 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  font-weight: bold;
  margin: 0 auto 20px;
}

.profile-header h2 {
  font-size: 24px;
  color: #1a1a2e;
  margin-bottom: 5px;
}

.profile-email {
  color: #666;
  font-size: 14px;
}

.profile-stats {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 30px;
  padding: 20px 0;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
}

.stat-item {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 32px;
  font-weight: bold;
  color: #00d4ff;
}

.stat-label {
  font-size: 14px;
  color: #666;
}

.profile-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 300px;
  margin: 0 auto;
}

.btn {
  padding: 14px 24px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
  text-decoration: none;
}

.btn-primary {
  background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 212, 255, 0.4);
}

.btn-secondary {
  background: #f0f0f0;
  color: #333;
}

.btn-secondary:hover {
  background: #e0e0e0;
}

.btn-danger {
  background: #ef4444;
  color: white;
}

.btn-danger:hover {
  background: #dc2626;
}

/* Корзина */
.cart-card {
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.cart-card h3 {
  font-size: 22px;
  color: #1a1a2e;
  margin-bottom: 25px;
}

.empty-cart {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

.empty-icon {
  font-size: 64px;
  display: block;
  margin-bottom: 20px;
}

.empty-cart p {
  font-size: 18px;
  margin-bottom: 25px;
}

.cart-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  gap: 15px;
}

.item-image {
  width: 60px;
  height: 60px;
  background: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
}

.item-info {
  flex: 1;
}

.item-info h4 {
  font-size: 16px;
  color: #1a1a2e;
  margin-bottom: 5px;
}

.item-price {
  color: #00d4ff;
  font-weight: 600;
}

.item-quantity {
  display: flex;
  align-items: center;
  gap: 10px;
}

.qty-btn {
  width: 32px;
  height: 32px;
  border: 2px solid #e0e0e0;
  background: white;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qty-btn:hover {
  border-color: #00d4ff;
  color: #00d4ff;
}

.qty-value {
  font-size: 16px;
  font-weight: 600;
  min-width: 30px;
  text-align: center;
}

.item-total {
  font-size: 18px;
  font-weight: bold;
  color: #1a1a2e;
  min-width: 100px;
  text-align: right;
}

.remove-btn {
  width: 36px;
  height: 36px;
  border: none;
  background: #fee2e2;
  color: #ef4444;
  border-radius: 8px;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-btn:hover {
  background: #ef4444;
  color: white;
}

.cart-summary {
  background: #f8f9fa;
  padding: 25px;
  border-radius: 16px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 16px;
  color: #666;
}

.summary-row.total {
  font-size: 20px;
  font-weight: bold;
  color: #1a1a2e;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #e0e0e0;
}

.checkout-btn {
  width: 100%;
  padding: 18px;
  font-size: 18px;
}

/* Заказы */
.orders-card {
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.orders-card h3 {
  font-size: 22px;
  color: #1a1a2e;
  margin-bottom: 25px;
}

.no-orders {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

.no-orders-icon {
  font-size: 48px;
  display: block;
  margin-bottom: 15px;
}

.no-orders p {
  margin-bottom: 20px;
  font-size: 16px;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.order-item {
  background: #f8f9fa;
  border-radius: 16px;
  padding: 25px;
}

.order-header {
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

.order-id {
  font-weight: bold;
  font-size: 18px;
  color: #00d4ff;
}

.order-date {
  color: #999;
  font-size: 14px;
}

.order-status {
  margin-left: auto;
  background: #dbeafe;
  color: #2563eb;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
}

.order-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e0e0e0;
}

.order-product {
  font-size: 15px;
  color: #333;
}

.order-total {
  font-size: 18px;
  font-weight: bold;
  color: #1a1a2e;
  text-align: right;
}

/* Edit modal */
.edit-modal-overlay {
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
}

.edit-modal {
  background: white;
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  max-width: 450px;
  position: relative;
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
}

.close-btn:hover {
  color: #333;
}

.edit-modal h2 {
  font-size: 24px;
  color: #1a1a2e;
  margin-bottom: 25px;
  text-align: center;
}

.edit-form {
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

.form-group input {
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
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.form-actions .btn {
  flex: 1;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 32px;
  }

  .tabs {
    flex-wrap: wrap;
  }

  .tab-btn {
    flex: 1;
    min-width: 120px;
    padding: 12px 16px;
  }

  .profile-card,
  .cart-card,
  .orders-card {
    padding: 30px 20px;
  }

  .profile-stats {
    gap: 20px;
  }

  .cart-item {
    flex-wrap: wrap;
  }

  .item-total {
    order: 5;
    width: 100%;
    text-align: left;
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid #e0e0e0;
  }

  .remove-btn {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  .cart-item {
    position: relative;
  }
}
</style>