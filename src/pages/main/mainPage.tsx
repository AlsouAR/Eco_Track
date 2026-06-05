import { ArrowRight, BarChart3, Calendar, Leaf, Map, TreePine, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

import * as S from "./MainPage.styles";

const MainPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Calendar size={32} />,
      title: "Трекер привычек",
      description:
        "Отмечайте ежедневные эко-привычки, следите за прогрессом в календаре и стройте непрерывные серии.",
      color: "#4CAF50",
    },
    {
      icon: <BarChart3 size={32} />,
      title: "Дашборд достижений",
      description:
        "Визуализируйте свой вклад в экологию: сэкономленная вода, снижение CO₂, спасённые деревья.",
      color: "#66BB6A",
    },
    {
      icon: <Map size={32} />,
      title: "Эко-карта",
      description:
        "Находите точки сбора вторсырья, велопарковки и эко-события. Делитесь своими локациями.",
      color: "#81C784",
    },
    {
      icon: <User size={32} />,
      title: "Личный профиль",
      description:
        "Настраивайте цели, смотрите статистику, экспортируйте отчёты и получайте достижения.",
      color: "#A5D6A7",
    },
  ];

  const steps = [
    { step: "01", title: "Зарегистрируйтесь", description: "Создайте аккаунт за 1 минуту" },
    {
      step: "02",
      title: "Выберите привычки",
      description: "Отметьте эко-привычки, которые хотите развивать",
    },
    {
      step: "03",
      title: "Отмечайте ежедневно",
      description: "Каждый день отмечайте выполненные действия",
    },
    {
      step: "04",
      title: "Следите за прогрессом",
      description: "Наблюдайте за своим влиянием на экологию",
    },
  ];

  return (
    <S.PageContainer>
      <S.HeroSection>
        <S.HeroContent>
          <S.HeroBadge>
            <Leaf size={16} />
            <span>EcoTrack — ваш эко-помощник</span>
          </S.HeroBadge>

          <h1>
            Превращайте <S.GradientText>эко-привычки</S.GradientText>
            <br />в реальные достижения
          </h1>

          <p>
            Отслеживайте свои экологические привычки, участвуйте в эко-инициативах и смотрите, как
            ваши действия влияют на планету.
          </p>

          <S.HeroButtons>
            <S.ButtonPrimary onClick={() => navigate("/login")}>
              Начать путь <ArrowRight size={18} />
            </S.ButtonPrimary>
            <S.ButtonSecondary
              onClick={() => {
                document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Узнать больше
            </S.ButtonSecondary>
          </S.HeroButtons>
        </S.HeroContent>
      </S.HeroSection>

      <S.FeaturesSection id="features">
        <S.SectionHeader>
          <h2>
            Всё, что нужно для <S.GradientText>осознанного</S.GradientText> развития
          </h2>
          <p>EcoTrack объединяет множество функций</p>
        </S.SectionHeader>

        <S.FeaturesGrid>
          {features.map((feature, index) => (
            <S.FeatureCard key={index}>
              <S.FeatureIcon>{feature.icon}</S.FeatureIcon>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </S.FeatureCard>
          ))}
        </S.FeaturesGrid>
      </S.FeaturesSection>

      <S.HowItWorks>
        <S.SectionHeader>
          <h2>Как начать?</h2>
        </S.SectionHeader>

        <S.StepsContainer>
          {steps.map((step, index) => (
            <S.StepItem key={index}>
              <S.StepNumber>{step.step}</S.StepNumber>
              <S.StepContent>
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </S.StepContent>
              {index < steps.length - 1 && <S.StepLine />}
            </S.StepItem>
          ))}
        </S.StepsContainer>
      </S.HowItWorks>

      <S.CTASection>
        <S.CTACard>
          <S.CTAIcon>
            <TreePine size={48} />
          </S.CTAIcon>
          <h2>Готовы изменить мир к лучшему?</h2>
          <p>Начните с малого — каждая эко-привычка имеет значение</p>
          <S.ButtonPrimary onClick={() => navigate("/login")}>
            Создать аккаунт <ArrowRight size={18} />
          </S.ButtonPrimary>
          <S.CTANote>
            Уже есть аккаунт? <span onClick={() => navigate("/login")}>Войти</span>
          </S.CTANote>
        </S.CTACard>
      </S.CTASection>

      <S.MainFooter>
        <S.FooterContent>
          <S.FooterLogo>
            <Leaf size={24} />
            <span>EcoTrack</span>
          </S.FooterLogo>
          <p>Делаем экологичный образ жизни доступным каждому</p>
        </S.FooterContent>
      </S.MainFooter>
    </S.PageContainer>
  );
};

export default MainPage;
