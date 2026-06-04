import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Leaf, 
  Calendar, 
  BarChart3, 
  Map, 
  User, 
  TreePine,
  ArrowRight,
} from "lucide-react";
import "./main_page.css";

const MainPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Calendar size={32} />,
      title: "Трекер привычек",
      description: "Отмечайте ежедневные эко-привычки, следите за прогрессом в календаре и стройте непрерывные серии.",
      color: "#4CAF50",
    },
    {
      icon: <BarChart3 size={32} />,
      title: "Дашборд достижений",
      description: "Визуализируйте свой вклад в экологию: сэкономленная вода, снижение CO₂, спасённые деревья.",
      color: "#66BB6A",
    },
    {
      icon: <Map size={32} />,
      title: "Эко-карта",
      description: "Находите точки сбора вторсырья, велопарковки и эко-события. Делитесь своими локациями.",
      color: "#81C784",
    },
    {
      icon: <User size={32} />,
      title: "Личный профиль",
      description: "Настраивайте цели, смотрите статистику, экспортируйте отчёты и получайте достижения.",
      color: "#A5D6A7",
    },
  ];

  const steps = [
    { step: "01", title: "Зарегистрируйтесь", description: "Создайте аккаунт за 1 минуту" },
    { step: "02", title: "Выберите привычки", description: "Отметьте эко-привычки, которые хотите развивать" },
    { step: "03", title: "Отмечайте ежедневно", description: "Каждый день отмечайте выполненные действия" },
    { step: "04", title: "Следите за прогрессом", description: "Наблюдайте за своим влиянием на экологию" },
  ];

  return (
    <div className="main-page">
      
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <Leaf size={16} />
            <span>EcoTrack — ваш эко-помощник</span>
          </div>
          
          <h1>
            Превращайте{" "}
            <span className="gradient-text">эко-привычки</span>
            <br />
            в реальные достижения
          </h1>
          
          <p>
            Отслеживайте свои экологические привычки, участвуйте в эко-инициативах
            и смотрите, как ваши действия влияют на планету.
          </p>
          
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => navigate("/login")}>
              Начать путь <ArrowRight size={18} />
            </button>
            <button className="btn-secondary" onClick={() => {
              document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
            }}>
              Узнать больше
            </button>
          </div>
        </div>
      </section>

      <section id="features" className="features-section">
        <div className="section-header">
          <h2>
            Всё, что нужно для <span className="gradient-text">осознанного</span> развития
          </h2>
          <p>
            EcoTrack объединяет множество функций
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="how-it-works">
        <div className="section-header">
          <h2>
            Как начать?
          </h2>
        </div>

        <div className="steps-container">
          {steps.map((step, index) => (
            <div key={index} className="step-item">
              <div className="step-number">{step.step}</div>
              <div className="step-content">
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </div>
              {index < steps.length - 1 && <div className="step-line" />}
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-card">
          <div className="cta-icon">
            <TreePine size={48} />
          </div>
          <h2>Готовы изменить мир к лучшему?</h2>
          <p>Начните с малого — каждая эко-привычка имеет значение</p>
          <button className="btn-primary" onClick={() => navigate("/login")}>
            Создать аккаунт <ArrowRight size={18} />
          </button>
          <p className="cta-note">Уже есть аккаунт? <span onClick={() => navigate("/login")}>Войти</span></p>
        </div>
      </section>

      <footer className="main-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <Leaf size={24} />
            <span>EcoTrack</span>
          </div>
          <p>Делаем экологичный образ жизни доступным каждому</p>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;