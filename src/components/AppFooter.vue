 <template>
  <footer class="app-footer">
    <div class="footer-container">
      <div class="footer-main">
        <div class="footer-brand">
          <div class="footer-logo">
            <span class="logo-icon">🔧</span>
            <span class="logo-text">Сервис53</span>
          </div>
          <p class="footer-description">
            Профессиональный ремонт и обслуживание ПК и телефонов.
            Быстро, качественно, с гарантией!
          </p>
        </div>

        <div class="footer-links">
          <h4>Навигация</h4>
          <nav>
            <router-link to="/">Главная</router-link>
            <router-link to="/services">Услуги</router-link>
            <router-link to="/shop">Магазин</router-link>
            <router-link to="/contacts">Контакты</router-link>
          </nav>
        </div>

        <div class="footer-contacts">
          <h4>Контакты</h4>
          <p>📍 г. Великий Новгород, ул. Примерная, д. 53</p>
          <p>📞 <a href="tel:+78162123456">+7 (8162) 12-34-56</a></p>
          <p>✉️ <a href="mailto:info@servis53.ru">info@servis53.ru</a></p>
          <p>🕐 Пн-Пт: 9:00 - 20:00</p>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2024 Сервис53. Все права защищены.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped>
.app-footer {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: white;
  padding: 60px 20px 20px;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-main {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
}

.footer-brand {
  max-width: 350px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.footer-logo .logo-icon {
  font-size: 32px;
}

.footer-logo .logo-text {
  font-size: 24px;
  font-weight: bold;
  background: linear-gradient(135deg, #00d4ff 0%, #7b2cbf 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer-description {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
}

.footer-links h4,
.footer-contacts h4 {
  font-size: 18px;
  margin-bottom: 20px;
  color: white;
}

.footer-links nav {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 0.3s;
  font-size: 15px;
}

.footer-links a:hover {
  color: #00d4ff;
}

.footer-contacts p {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 10px;
  font-size: 15px;
}

.footer-contacts a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 0.3s;
}

.footer-contacts a:hover {
  color: #00d4ff;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 20px;
  text-align: center;
}

.footer-bottom p {
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
}

@media (max-width: 768px) {
  .app-footer {
    padding: 40px 20px 20px;
  }

  .footer-main {
    gap: 30px;
  }

  .footer-brand {
    max-width: 100%;
  }
}
</style>