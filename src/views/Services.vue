<template>
  <div class="services-page">
    <div class="container">
      <h1 class="page-title">Наши услуги</h1>
      <p class="page-subtitle">Профессиональный ремонт и обслуживание ПК и телефонов</p>

      <div class="services-grid">
        <!-- Ремонт ПК -->
        <div class="service-category">
          <div class="category-header">
            <span class="category-icon">💻</span>
            <h2>Ремонт компьютеров</h2>
          </div>
          <div class="service-list">
            <div class="service-item" v-for="service in pcServices" :key="service.name">
              <div class="service-info">
                <h3>{{ service.name }}</h3>
                <p>{{ service.description }}</p>
              </div>
              <div class="service-price">
                <span class="price">от {{ service.price }} ₽</span>
                <button class="order-btn" @click="orderService(service.name)">
                  Заказать
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Ремонт телефонов -->
        <div class="service-category">
          <div class="category-header">
            <span class="category-icon">📱</span>
            <h2>Ремонт телефонов</h2>
          </div>
          <div class="service-list">
            <div class="service-item" v-for="service in phoneServices" :key="service.name">
              <div class="service-info">
                <h3>{{ service.name }}</h3>
                <p>{{ service.description }}</p>
              </div>
              <div class="service-price">
                <span class="price">от {{ service.price }} ₽</span>
                <button class="order-btn" @click="orderService(service.name)">
                  Заказать
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Прочие услуги -->
        <div class="service-category">
          <div class="category-header">
            <span class="category-icon">⚙️</span>
            <h2>Дополнительно</h2>
          </div>
          <div class="service-list">
            <div class="service-item" v-for="service in otherServices" :key="service.name">
              <div class="service-info">
                <h3>{{ service.name }}</h3>
                <p>{{ service.description }}</p>
              </div>
              <div class="service-price">
                <span class="price">от {{ service.price }} ₽</span>
                <button class="order-btn" @click="orderService(service.name)">
                  Заказать
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Services',
  data() {
    return {
      pcServices: [
        { name: 'Диагностика', description: 'Полная проверка компьютера, выявление неисправностей', price: '500' },
        { name: 'Чистка от пыли', description: 'Замена термопасты, чистка системы охлаждения', price: '1500' },
        { name: 'Установка Windows', description: 'Установка и настройка ОС, драйверов', price: '2000' },
        { name: 'Замена комплектующих', description: 'Замена жесткого диска, оперативной памяти, БП', price: '800' },
        { name: 'Ремонт материнской платы', description: 'Восстановление после скачков напряжения', price: '3500' },
        { name: 'Удаление вирусов', description: 'Полная очистка системы от вредоносного ПО', price: '1000' }
      ],
      phoneServices: [
        { name: 'Замена экрана', description: 'Установка нового дисплея или стекла', price: '2000' },
        { name: 'Замена аккумулятора', description: 'Установка новой батареи с гарантией', price: '1500' },
        { name: 'Ремонт разъема зарядки', description: 'Замена или восстановление разъема', price: '1200' },
        { name: 'Восстановление после воды', description: 'Чистка, диагностика, замена поврежденных элементов', price: '2500' },
        { name: 'Замена корпуса', description: 'Установка нового корпуса или задней крышки', price: '1800' },
        { name: 'Прошивка', description: 'Установка ПО, разблокировка, восстановление', price: '1500' }
      ],
      otherServices: [
        { name: 'Настройка Wi-Fi', description: 'Настройка роутера, усиление сигнала', price: '1000' },
        { name: 'Сборка ПК на заказ', description: 'Подбор комплектующих и сборка под ваши задачи', price: '3000' },
        { name: 'Настройка ПО', description: 'Установка и настройка программ, офисных пакетов', price: '800' },
        { name: 'Консультация', description: 'Профессиональная консультация по любым вопросам', price: '500' }
      ]
    }
  },
  methods: {
    orderService(serviceName) {
      alert(`Вы заказали услугу: "${serviceName}". Мы свяжемся с вами в ближайшее время!`)
    }
  }
}
</script>

<style scoped>
.services-page {
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
  margin-bottom: 50px;
}

.services-grid {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.service-category {
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.category-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #f0f0f0;
}

.category-icon {
  font-size: 40px;
}

.category-header h2 {
  font-size: 28px;
  color: #1a1a2e;
}

.service-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.service-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.service-item:hover {
  background: #e9ecef;
  transform: translateX(5px);
}

.service-info h3 {
  font-size: 18px;
  color: #1a1a2e;
  margin-bottom: 5px;
}

.service-info p {
  color: #666;
  font-size: 14px;
}

.service-price {
  display: flex;
  align-items: center;
  gap: 20px;
}

.price {
  font-size: 20px;
  font-weight: 700;
  color: #00d4ff;
  white-space: nowrap;
}

.order-btn {
  background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%);
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.order-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 212, 255, 0.4);
}

@media (max-width: 768px) {
  .page-title {
    font-size: 32px;
  }

  .service-category {
    padding: 20px;
  }

  .service-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .service-price {
    width: 100%;
    justify-content: space-between;
  }
}
</style>