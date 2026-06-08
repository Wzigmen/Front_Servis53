<template>
  <div class="shop-page">
    <div class="container">
      <h1 class="page-title">Магазин техники</h1>
      <p class="page-subtitle">Проверенная техника с гарантией от нашего сервиса</p>

      <!-- Фильтры -->
      <div class="filters">
        <div class="filter-group">
          <label>Категория:</label>
          <select v-model="selectedCategory" @change="filterProducts">
            <option value="all">Все</option>
            <option value="computers">Компьютеры</option>
            <option value="laptops">Ноутбуки</option>
            <option value="phones">Телефоны</option>
            <option value="accessories">Аксессуары</option>
          </select>
        </div>
        <div class="filter-group">
          <label>Цена до:</label>
          <select v-model="maxPrice" @change="filterProducts">
            <option value="all">Любая</option>
            <option value="15000">15 000 ₽</option>
            <option value="30000">30 000 ₽</option>
            <option value="50000">50 000 ₽</option>
            <option value="100000">100 000 ₽</option>
          </select>
        </div>
      </div>

      <!-- Сетка товаров -->
      <div class="products-grid">
        <div class="product-card" v-for="product in filteredProducts" :key="product.id">
          <div class="product-image">
            <span class="product-emoji">{{ product.emoji }}</span>
            <span class="product-badge" v-if="product.badge">{{ product.badge }}</span>
          </div>
          <div class="product-info">
            <h3>{{ product.name }}</h3>
            <p class="product-description">{{ product.description }}</p>
            <div class="product-specs">
              <span class="spec-tag" v-for="spec in product.specs" :key="spec">
                {{ spec }}
              </span>
            </div>
            <div class="product-footer">
              <span class="product-price">{{ product.price.toLocaleString() }} ₽</span>
              <button class="buy-btn" @click="openConfirmModal(product)">
                Купить
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Пустое состояние -->
      <div v-if="filteredProducts.length === 0" class="no-products">
        <span class="no-products-icon">🔍</span>
        <h3>Товары не найдены</h3>
        <p>Попробуйте изменить параметры фильтра</p>
      </div>
    </div>

    <!-- Модальное окно подтверждения добавления в корзину -->
    <ConfirmModal
      :is-open="showConfirmModal"
      title="Добавить в корзину?"
      :message="confirmMessage"
      confirm-text="Да, добавить"
      cancel-text="Нет, отмена"
      @confirm="addToCart"
      @close="showConfirmModal = false"
    />

    <!-- Модальное окно успешного добавления -->
    <ConfirmModal
      :is-open="showSuccessModal"
      title="Товар добавлен в корзину!"
      :message="successMessage"
      confirm-text="Перейти в корзину"
      cancel-text="Продолжить покупки"
      @confirm="goToCart"
      @cancel="showSuccessModal = false"
      @close="showSuccessModal = false"
    />
  </div>
</template>

<script>
import ConfirmModal from '../components/ConfirmModal.vue'

export default {
  name: 'Shop',
  components: {
    ConfirmModal
  },
  data() {
    return {
      selectedCategory: 'all',
      maxPrice: 'all',
      showConfirmModal: false,
      showSuccessModal: false,
      currentProduct: null,
      products: [
        {
          id: 1,
          name: 'Игровой компьютер "Турбо"',
          description: 'Мощный игровой ПК для любых задач',
          emoji: '🖥️',
          price: 89900,
          category: 'computers',
          badge: 'Хит',
          specs: ['Intel Core i5', 'RTX 4060', '16GB RAM', '1TB SSD']
        },
        {
          id: 2,
          name: 'Офисный компьютер',
          description: 'Надежный ПК для работы и учебы',
          emoji: '🖥️',
          price: 35900,
          category: 'computers',
          specs: ['Intel Core i3', 'Intel UHD', '8GB RAM', '500GB SSD']
        },
        {
          id: 3,
          name: 'Ноутбук UltraBook Pro',
          description: 'Тонкий и легкий для работы везде',
          emoji: '💻',
          price: 65900,
          category: 'laptops',
          badge: 'Новинка',
          specs: ['Intel Core i7', '14"', '16GB RAM', '512GB SSD']
        },
        {
          id: 4,
          name: 'Ноутбук HomeBook',
          description: 'Отличный выбор для дома',
          emoji: '💻',
          price: 42900,
          category: 'laptops',
          specs: ['AMD Ryzen 5', '15.6"', '8GB RAM', '256GB SSD']
        },
        {
          id: 5,
          name: 'iPhone 14',
          description: 'Восстановленный, как новый',
          emoji: '📱',
          price: 69900,
          category: 'phones',
          badge: 'Гарантия',
          specs: ['128GB', 'Отличное состояние', 'Новая батарея']
        },
        {
          id: 6,
          name: 'Samsung Galaxy A54',
          description: 'Стильный и функциональный',
          emoji: '📱',
          price: 32900,
          category: 'phones',
          specs: ['128GB', '120Hz экран', '5000mAh']
        },
        {
          id: 7,
          name: 'Xiaomi Redmi Note 12',
          description: 'Лучшее соотношение цены и качества',
          emoji: '📱',
          price: 18900,
          category: 'phones',
          specs: ['128GB', '120Hz AMOLED', '5000mAh']
        },
        {
          id: 8,
          name: 'Игровая мышь ProGamer',
          description: 'Точность и комфорт в игре',
          emoji: '🖱️',
          price: 4900,
          category: 'accessories',
          specs: ['16000 DPI', 'RGB подсветка', '6 кнопок']
        },
        {
          id: 9,
          name: 'Механическая клавиатура',
          description: 'Тактильное удовольствие от печати',
          emoji: '⌨️',
          price: 7900,
          category: 'accessories',
          specs: ['Cherry MX Red', 'RGB', 'Алюминиевый корпус']
        },
        {
          id: 10,
          name: 'Монитор 27" 4K',
          description: 'Кристально чистое изображение',
          emoji: '🖥️',
          price: 34900,
          category: 'accessories',
          specs: ['27"', '4K UHD', 'IPS', 'HDR400']
        },
        {
          id: 11,
          name: 'Беспроводные наушники',
          description: 'Чистый звук без проводов',
          emoji: '🎧',
          price: 8900,
          category: 'accessories',
          specs: ['ANC', '30 часов работы', 'Bluetooth 5.3']
        },
        {
          id: 12,
          name: 'Игровой компьютер "Мега"',
          description: 'Максимальная производительность',
          emoji: '🖥️',
          price: 149900,
          category: 'computers',
          badge: 'Топ',
          specs: ['Intel Core i9', 'RTX 4080', '32GB RAM', '2TB SSD']
        }
      ]
    }
  },
  computed: {
    filteredProducts() {
      let result = [...this.products]

      // Фильтр по категории
      if (this.selectedCategory !== 'all') {
        result = result.filter(p => p.category === this.selectedCategory)
      }

      // Фильтр по цене
      if (this.maxPrice !== 'all') {
        const maxPriceNum = parseInt(this.maxPrice)
        result = result.filter(p => p.price <= maxPriceNum)
      }

      return result
    },
    confirmMessage() {
      if (!this.currentProduct) return ''
      return `"${this.currentProduct.name}"\nЦена: ${this.currentProduct.price.toLocaleString()} ₽`
    },
    successMessage() {
      if (!this.currentProduct) return ''
      return `Товар "${this.currentProduct.name}" успешно добавлен в корзину.`
    }
  },
  methods: {
    filterProducts() {
      // Метод вызывается при изменении фильтров
      // Логика уже в computed filteredProducts
    },
    openConfirmModal(product) {
      // Проверяем, авторизован ли пользователь
      const currentUser = localStorage.getItem('currentUser')
      if (!currentUser) {
        alert('Для покупки необходимо зарегистрироваться или войти в аккаунт.\nПожалуйста, войдите или создайте аккаунт.')
        // Открываем модальное окно авторизации через событие
        window.dispatchEvent(new Event('open-auth-modal'))
        return
      }

      this.currentProduct = product
      this.showConfirmModal = true
    },
    addToCart() {
      if (!this.currentProduct) return

      // Получаем текущую корзину
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')

      // Проверяем, есть ли уже такой товар
      const existingIndex = cart.findIndex(item => item.id === this.currentProduct.id)
      if (existingIndex !== -1) {
        cart[existingIndex].quantity += 1
      } else {
        cart.push({
          ...this.currentProduct,
          quantity: 1
        })
      }

      // Сохраняем корзину
      localStorage.setItem('cart', JSON.stringify(cart))

      // Обновляем счетчик в шапке
      window.dispatchEvent(new Event('cart-updated'))

      // Показываем модальное окно успеха
      this.showConfirmModal = false
      this.showSuccessModal = true
    },
    goToCart() {
      this.showSuccessModal = false
      this.$router.push('/profile?tab=cart')
    }
  }
}
</script>

<style scoped>
.shop-page {
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
  margin-bottom: 10px;
}

.page-subtitle {
  text-align: center;
  color: #666;
  font-size: 18px;
  margin-bottom: 40px;
}

/* Фильтры */
.filters {
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
  flex-wrap: wrap;
  justify-content: center;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter-group label {
  font-size: 15px;
  color: #555;
  font-weight: 500;
}

.filter-group select {
  padding: 10px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  transition: border-color 0.3s;
}

.filter-group select:focus {
  outline: none;
  border-color: #00d4ff;
}

/* Сетка товаров */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
}

.product-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
}

.product-image {
  height: 180px;
  background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.product-emoji {
  font-size: 80px;
}

.product-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.product-info {
  padding: 20px;
}

.product-info h3 {
  font-size: 18px;
  color: #1a1a2e;
  margin-bottom: 8px;
  line-height: 1.3;
}

.product-description {
  color: #666;
  font-size: 14px;
  margin-bottom: 15px;
}

.product-specs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 20px;
}

.spec-tag {
  background: #f0f0f0;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  color: #555;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-price {
  font-size: 22px;
  font-weight: 700;
  color: #00d4ff;
}

.buy-btn {
  background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%);
  color: white;
  border: none;
  padding: 12px 28px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.buy-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 212, 255, 0.4);
}

/* Пустое состояние */
.no-products {
  text-align: center;
  padding: 80px 20px;
  color: #666;
}

.no-products-icon {
  font-size: 64px;
  display: block;
  margin-bottom: 20px;
}

.no-products h3 {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 32px;
  }

  .filters {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-group {
    flex-direction: column;
    align-items: flex-start;
  }

  .filter-group select {
    width: 100%;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
}
</style>