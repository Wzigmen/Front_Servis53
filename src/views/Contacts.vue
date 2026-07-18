<template>
  <div class="contacts-page">
    <div class="container">
      <h1 class="page-title">Контакты</h1>
      <p class="page-subtitle">Свяжитесь с нами любым удобным способом</p>

      <div class="contacts-grid">
        <!-- Контактная информация -->
        <div class="contact-info-card">
          <h2>Контактная информация</h2>
          <div class="contact-items">
            <div class="contact-item">
              <span class="contact-icon">📍</span>
              <div class="contact-details">
                <h3>Адрес</h3>
                <p>г. Великий Новгород,<br>ул. Примерная, д. 53</p>
              </div>
            </div>
            <div class="contact-item">
              <span class="contact-icon">📞</span>
              <div class="contact-details">
                <h3>Телефон</h3>
                <p><a href="tel:+78162123456">+7 (8162) 12-34-56</a></p>
                <p><a href="tel:+79991234567">+7 (999) 123-45-67</a></p>
              </div>
            </div>
            <div class="contact-item">
              <span class="contact-icon">✉️</span>
              <div class="contact-details">
                <h3>Email</h3>
                <p><a href="mailto:info@servis53.ru">info@servis53.ru</a></p>
              </div>
            </div>
            <div class="contact-item">
              <span class="contact-icon">🕐</span>
              <div class="contact-details">
                <h3>Режим работы</h3>
                <p>Пн-Пт: 9:00 - 20:00</p>
                <p>Сб-Вс: 10:00 - 18:00</p>
              </div>
            </div>
          </div>

          <!-- Социальные сети -->
          <div class="social-links">
            <h3>Мы в социальных сетях</h3>
            <div class="social-buttons">
              <a href="#" class="social-btn vk">VK</a>
              <a href="#" class="social-btn telegram">Telegram</a>
              <a href="#" class="social-btn whatsapp">WhatsApp</a>
            </div>
          </div>
        </div>

        <!-- Форма обратной связи -->
        <div class="contact-form-card">
          <h2>Оставить заявку</h2>
          <p class="form-description">Заполните форму и мы свяжемся с вами в течение 15 минут</p>

          <form @submit.prevent="submitForm" class="contact-form">
            <div class="form-group">
              <label for="name">Ваше имя *</label>
              <input id="name" v-model="form.name" type="text" placeholder="Иван Иванов" :class="{ error: errors.name }"
                required />
              <span class="error-message" v-if="errors.name">{{ errors.name }}</span>
            </div>

            <div class="form-group">
              <label for="phone">Телефон *</label>
              <input id="phone" v-model="form.phone" type="tel" placeholder="+7 (999) 123-45-67"
                :class="{ error: errors.phone }" required />
              <span class="error-message" v-if="errors.phone">{{ errors.phone }}</span>
            </div>

            <div class="form-group">
              <label for="email">Email</label>
              <input id="email" v-model="form.email" type="email" placeholder="example@mail.ru"
                :class="{ error: errors.email }" />
              <span class="error-message" v-if="errors.email">{{ errors.email }}</span>
            </div>

            <div class="form-group">

              <label for="service">Тип услуги</label>

              <template v-if="form.service">

                <div class="selected-service">

                  🔧 {{ form.service }}

                  <button type="button" class="change-service" @click="form.service = ''">
                    Изменить
                  </button>

                </div>

              </template>

              <select v-else id="service" v-model="form.service">

                <option disabled value="">
                  Выберите услугу
                </option>

                <optgroup label="Ремонт компьютеров">

                  <option>Диагностика</option>

                  <option>Чистка от пыли</option>

                  <option>Установка Windows</option>

                  <option>Замена комплектующих</option>

                  <option>Ремонт материнской платы</option>

                  <option>Удаление вирусов</option>

                </optgroup>

                <optgroup label="Ремонт телефонов">

                  <option>Замена экрана</option>

                  <option>Замена аккумулятора</option>

                  <option>Ремонт разъема зарядки</option>

                  <option>Восстановление после воды</option>

                  <option>Замена корпуса</option>

                  <option>Прошивка</option>

                </optgroup>

                <optgroup label="Дополнительно">

                  <option>Настройка Wi-Fi</option>

                  <option>Сборка ПК на заказ</option>

                  <option>Настройка ПО</option>

                  <option>Консультация</option>

                </optgroup>

              </select>

            </div>

            <div class="form-group">
              <label for="message">Сообщение</label>
              <textarea id="message" v-model="form.message" rows="4" placeholder="Опишите вашу проблему..."></textarea>
            </div>

            <button type="submit" class="submit-btn" :disabled="isSubmitting">
              {{ isSubmitting ? 'Отправка...' : 'Отправить заявку' }}
            </button>
          </form>
        </div>
      </div>

      <!-- Карта -->
      <div class="map-section">
        <h2>Как нас найти</h2>
        <div class="map-placeholder">
          <span class="map-emoji">🗺️</span>
          <p>г. Великий Новгород, ул. Примерная, д. 53</p>
          <span class="map-note">Карта загружается...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useRoute } from "vue-router";
import api from "@/api/api";

export default {
  name: 'Contacts',
  data() {
    return {
      form: {
        name: '',
        phone: '',
        email: '',
        service: '',
        message: ''
      },
      errors: {},
      isSubmitting: false
    }

  },
  mounted() {

    if (this.$route.query.service) {

      this.form.service = this.$route.query.service;

    }

  },
  methods: {
    validateForm() {
      this.errors = {}
      let isValid = true

      if (!this.form.name.trim()) {
        this.errors.name = 'Введите имя'
        isValid = false
      } else if (this.form.name.trim().length < 2) {
        this.errors.name = 'Имя должно быть не менее 2 символов'
        isValid = false
      }

      if (!this.form.phone.trim()) {
        this.errors.phone = 'Введите телефон'
        isValid = false
      } else if (!/^[\d\s\+\-\(\)]+$/.test(this.form.phone)) {
        this.errors.phone = 'Введите корректный номер телефона'
        isValid = false
      }

      if (this.form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email)) {
        this.errors.email = 'Введите корректный email'
        isValid = false
      }

      return isValid
    },

    async submitForm() {

      if (!this.validateForm()) {
        return;
      }

      this.isSubmitting = true;

      try {

        await api.post(
          "http://localhost:5001/send",
          this.form
        );

        alert(
          "Спасибо! Ваша заявка успешно отправлена.\nМы свяжемся с вами в ближайшее время!"
        );

        this.form = {
          name: "",
          phone: "",
          email: "",
          service: "",
          message: ""
        };

      }
      catch (e) {

        console.error(e);

        alert("Не удалось отправить заявку.");

      }
      finally {

        this.isSubmitting = false;

      }

    }
  }
}
</script>

<style scoped>
.contacts-page {
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

.contacts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 50px;
}

.contact-info-card,
.contact-form-card {
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.contact-info-card h2,
.contact-form-card h2 {
  font-size: 24px;
  color: #1a1a2e;
  margin-bottom: 30px;
}

.contact-items {
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-bottom: 30px;
}

.contact-item {
  display: flex;
  gap: 20px;
}

.contact-icon {
  font-size: 32px;
  flex-shrink: 0;
}

.contact-details h3 {
  font-size: 16px;
  color: #1a1a2e;
  margin-bottom: 5px;
}

.contact-details p {
  color: #666;
  font-size: 15px;
  line-height: 1.5;
}

.contact-details a {
  color: #00d4ff;
  text-decoration: none;
  transition: color 0.3s;
}

.contact-details a:hover {
  color: #0099cc;
}

.social-links h3 {
  font-size: 16px;
  color: #1a1a2e;
  margin-bottom: 15px;
}

.social-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.social-btn {
  padding: 10px 20px;
  border-radius: 10px;
  text-decoration: none;
  color: white;
  font-weight: 600;
  font-size: 14px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.social-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.social-btn.vk {
  background: linear-gradient(135deg, #0077FF 0%, #0055cc 100%);
}

.social-btn.telegram {
  background: linear-gradient(135deg, #229ED9 0%, #1b7db0 100%);
}

.social-btn.whatsapp {
  background: linear-gradient(135deg, #25D366 0%, #1da851 100%);
}

/* Форма */
.form-description {
  color: #666;
  margin-bottom: 30px;
}

.contact-form {
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

.form-group input,
.form-group select,
.form-group textarea {
  padding: 14px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 15px;
  transition: border-color 0.3s;
  outline: none;
  font-family: inherit;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #00d4ff;
}

.form-group input.error,
.form-group select.error,
.form-group textarea.error {
  border-color: #ef4444;
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.error-message {
  font-size: 12px;
  color: #ef4444;
}

.submit-btn {
  background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%);
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(0, 212, 255, 0.4);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Карта */
.map-section {
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.map-section h2 {
  font-size: 24px;
  color: #1a1a2e;
  margin-bottom: 20px;
}

.map-placeholder {
  height: 400px;
  background: linear-gradient(135deg, #e0e0e0 0%, #f0f0f0 100%);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #666;
}

.map-emoji {
  font-size: 64px;
  margin-bottom: 15px;
}

.map-placeholder p {
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
}

.map-note {
  font-size: 14px;
  color: #999;
}

.selected-service{

    display:flex;

    justify-content:space-between;

    align-items:center;

    padding:8px 18px;

    border:1px solid #dbe3ee;

    border-radius:12px;

    background:#f8fafc;

    transition:.25s;

}

.selected-service:hover{

    border-color:#2563eb;

}

.selected-service span{

    font-size:15px;

    font-weight:600;

    color:#1e293b;

}

.change-service{

    border:1px solid #dbe3ee;

    background:white;

    color:#2563eb;

    padding:8px 16px;

    border-radius:10px;

    cursor:pointer;

    font-size:14px;

    font-weight:600;

    transition:.25s;

}

.change-service:hover{

    border-color:#2563eb;

    background:#2563eb;

    color:white;

}

@media (max-width: 768px) {
  .page-title {
    font-size: 32px;
  }

  .contacts-grid {
    grid-template-columns: 1fr;
  }

  .contact-info-card,
  .contact-form-card {
    padding: 30px 20px;
  }

  .map-section {
    padding: 30px 20px;
  }

  .map-placeholder {
    height: 300px;
  }
}
</style>