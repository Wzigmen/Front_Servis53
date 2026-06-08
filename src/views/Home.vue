<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>Профессиональный ремонт<br>ПК и телефонов</h1>
        <p>Быстро, качественно, с гарантией! Ваши устройства в надёжных руках.</p>
        <div class="hero-buttons">
          <router-link to="/services" class="btn btn-primary">Наши услуги</router-link>
          <router-link to="/contacts" class="btn btn-secondary">Связаться с нами</router-link>
        </div>
      </div>
      <div class="hero-image">
        <div class="hero-visual">
          <span class="visual-icon">💻📱</span>
        </div>
      </div>
    </section>

    <!-- Преимущества -->
    <section class="advantages">
      <div class="container">
        <h2 class="section-title">Почему выбирают нас</h2>
        <div class="advantages-grid">
          <div class="advantage-card">
            <div class="advantage-icon">⚡</div>
            <h3>Быстро</h3>
            <p>Срочный ремонт от 30 минут</p>
          </div>
          <div class="advantage-card">
            <div class="advantage-icon">🛡️</div>
            <h3>Гарантия</h3>
            <p>До 12 месяцев на все работы</p>
          </div>
          <div class="advantage-card">
            <div class="advantage-icon">💎</div>
            <h3>Качественно</h3>
            <p>Оригинальные запчасти</p>
          </div>
          <div class="advantage-card">
            <div class="advantage-icon">💰</div>
            <h3>Выгодно</h3>
            <p>Честные цены без накруток</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Мастера -->
    <section class="masters">
      <div class="container">
        <h2 class="section-title">Наши мастера</h2>
        <p class="section-subtitle">Команда профессионалов с многолетним опытом</p>
        <div class="masters-grid">
          <div class="master-card" v-for="master in masters" :key="master.id">
            <div class="master-avatar">
              <span class="avatar-emoji">{{ master.emoji }}</span>
            </div>
            <h3>{{ master.name }}</h3>
            <p class="master-role">{{ master.role }}</p>
            <p class="master-experience">{{ master.experience }}</p>
            <div class="master-skills">
              <span class="skill-tag" v-for="skill in master.skills" :key="skill">
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Призыв к действию -->
    <section class="cta">
      <div class="container">
        <div class="cta-content">
          <h2>Готовы начать?</h2>
          <p>Оставьте заявку и мы свяжемся с вами в течение 15 минут</p>
          <router-link to="/contacts" class="btn btn-primary btn-large">
            Оставить заявку
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      masters: [
        {
          id: 1,
          name: 'Алексей Петров',
          emoji: '👨‍💻',
          role: 'Старший инженер',
          experience: '10 лет опыта',
          skills: ['Ремонт ПК', 'Сборка', 'Диагностика']
        },
        {
          id: 2,
          name: 'Дмитрий Иванов',
          emoji: '👨‍🔧',
          role: 'Мастер по телефонам',
          experience: '7 лет опыта',
          skills: ['Ремонт смартфонов', 'Замена экранов', 'Восстановление']
        },
        {
          id: 3,
          name: 'Мария Сидорова',
          emoji: '👩‍💻',
          role: 'IT-специалист',
          experience: '5 лет опыта',
          skills: ['Настройка ПО', 'Удаление вирусов', 'Консультации']
        }
      ]
    }
  }
}
</script>

<style scoped>
.home-page {
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Hero Section */
.hero {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  padding: 80px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 500px;
}

.hero-content {
  text-align: center;
  color: white;
  max-width: 800px;
}

.hero-content h1 {
  font-size: 48px;
  margin-bottom: 20px;
  line-height: 1.2;
}

.hero-content p {
  font-size: 20px;
  margin-bottom: 30px;
  color: rgba(255, 255, 255, 0.8);
}

.hero-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 14px 32px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
}

.btn-primary {
  background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(0, 212, 255, 0.4);
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn-secondary:hover {
  background: white;
  color: #1a1a2e;
}

.btn-large {
  padding: 18px 48px;
  font-size: 18px;
}

.hero-image {
  display: none;
}

.hero-visual {
  font-size: 120px;
}

/* Section styles */
.section-title {
  font-size: 36px;
  text-align: center;
  margin-bottom: 10px;
  color: #1a1a2e;
}

.section-subtitle {
  text-align: center;
  color: #666;
  font-size: 18px;
  margin-bottom: 50px;
}

/* Advantages */
.advantages {
  padding: 80px 0;
  background: #f8f9fa;
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.advantage-card {
  background: white;
  padding: 40px 30px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
}

.advantage-card:hover {
  transform: translateY(-10px);
}

.advantage-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.advantage-card h3 {
  font-size: 22px;
  color: #1a1a2e;
  margin-bottom: 10px;
}

.advantage-card p {
  color: #666;
  font-size: 15px;
}

/* Masters */
.masters {
  padding: 80px 0;
}

.masters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  justify-content: center;
}

.master-card {
  background: white;
  padding: 40px 30px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
}

.master-card:hover {
  transform: translateY(-10px);
}

.master-avatar {
  width: 120px;
  height: 120px;
  margin: 0 auto 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00d4ff 0%, #7b2cbf 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60px;
}

.master-card h3 {
  font-size: 22px;
  color: #1a1a2e;
  margin-bottom: 5px;
}

.master-role {
  color: #00d4ff;
  font-weight: 600;
  margin-bottom: 5px;
}

.master-experience {
  color: #666;
  font-size: 14px;
  margin-bottom: 20px;
}

.master-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

.skill-tag {
  background: #f0f0f0;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  color: #555;
}

/* CTA */
.cta {
  background: linear-gradient(135deg, #00d4ff 0%, #7b2cbf 100%);
  padding: 80px 20px;
}

.cta-content {
  text-align: center;
  color: white;
}

.cta-content h2 {
  font-size: 36px;
  margin-bottom: 15px;
}

.cta-content p {
  font-size: 18px;
  margin-bottom: 30px;
  opacity: 0.9;
}

.cta .btn-primary {
  background: white;
  color: #7b2cbf;
}

.cta .btn-primary:hover {
  background: #f0f0f0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .hero {
    padding: 60px 20px;
  }

  .hero-content h1 {
    font-size: 32px;
  }

  .hero-content p {
    font-size: 16px;
  }

  .section-title {
    font-size: 28px;
  }

  .advantages,
  .masters {
    padding: 60px 0;
  }

  .cta {
    padding: 60px 20px;
  }

  .cta-content h2 {
    font-size: 28px;
  }
}
</style>