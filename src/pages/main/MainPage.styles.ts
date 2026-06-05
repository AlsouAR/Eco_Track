import styled from "@emotion/styled";

export const PageContainer = styled.div`
  min-height: 100vh;
  overflow-x: hidden;
`;

export const HeroSection = styled.section`
  position: relative;
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 60px;

  @media (max-width: 1024px) {
    padding: 60px 40px;
  }

  @media (max-width: 768px) {
    padding: 40px 20px;
    min-height: 80vh;
  }
`;

export const HeroContent = styled.div`
  flex: 1;
  max-width: 600px;
  z-index: 1;
  text-align: center;
  margin: 0 auto;

  h1 {
    font-size: 56px;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 24px;
    color: #1b5e20;
  }

  p {
    font-size: 18px;
    line-height: 1.6;
    color: #558b2f;
    margin-bottom: 32px;
  }

  @media (max-width: 1024px) {
    h1 {
      font-size: 42px;
    }
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 32px;
    }

    p {
      font-size: 16px;
    }
  }
`;

export const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 40px;
  font-size: 14px;
  font-weight: 500;
  color: #4caf50;
  margin-bottom: 24px;
  margin-left: auto;
  margin-right: auto;
`;

export const GradientText = styled.span`
  background: linear-gradient(135deg, #4caf50, #84cc16);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

export const HeroButtons = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

export const ButtonPrimary = styled.button`
  background: #4caf50;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 40px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  display: inline-flex;

  &:hover {
    background: #45a049;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
  }
`;

export const ButtonSecondary = styled.button`
  background: transparent;
  color: #4caf50;
  border: 2px solid #4caf50;
  padding: 10px 24px;
  border-radius: 40px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: #4caf50;
    color: white;
    box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
  }
`;

export const FeaturesSection = styled.section`
  padding: 80px 60px;

  @media (max-width: 1024px) {
    padding: 60px 40px;
  }

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

export const SectionHeader = styled.div`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 60px;

  h2 {
    font-size: 40px;
    font-weight: 700;
    color: #1b5e20;
    margin-bottom: 16px;
  }

  p {
    font-size: 18px;
    color: #6b8c42;
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 28px;
    }

    p {
      font-size: 16px;
    }
  }
`;

export const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  @media (max-width: 768px) {
    gap: 20px;
  }
`;

export const FeatureCard = styled.div`
  background: white;
  padding: 32px;
  border-radius: 28px;
  transition: all 0.3s ease;
  border: 1px solid rgba(76, 175, 80, 0.1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(76, 175, 80, 0.1);
  }

  h3 {
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 12px;
    color: #1b5e20;
  }

  p {
    font-size: 15px;
    line-height: 1.5;
    color: #7a8a6e;
  }

  @media (max-width: 768px) {
    padding: 24px;

    h3 {
      font-size: 20px;
    }
  }
`;

export const FeatureIcon = styled.div`
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  margin-bottom: 24px;
  color: var(--feature-color, #4caf50);
`;

export const HowItWorks = styled.section`
  padding: 80px 60px;
  background: white;

  @media (max-width: 1024px) {
    padding: 60px 40px;
  }

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

export const StepsContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

export const StepItem = styled.div`
  display: flex;
  gap: 24px;
  position: relative;
  padding-bottom: 40px;

  &:last-child {
    padding-bottom: 0;
  }

  @media (max-width: 768px) {
    gap: 16px;
    padding-bottom: 30px;
  }
`;

export const StepNumber = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #4caf50;
  color: white;
  font-size: 18px;
  font-weight: 700;
  border-radius: 50%;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }
`;

export const StepContent = styled.div`
  h4 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 8px;
    color: #1b5e20;
  }

  p {
    color: #8ba07a;
  }

  @media (max-width: 768px) {
    h4 {
      font-size: 18px;
    }

    p {
      font-size: 14px;
    }
  }
`;

export const StepLine = styled.div`
  position: absolute;
  left: 23px;
  top: 48px;
  width: 2px;
  height: calc(100% - 48px);

  @media (max-width: 768px) {
    left: 19px;
    top: 40px;
  }
`;

export const CTASection = styled.section`
  padding: 80px 60px;

  @media (max-width: 1024px) {
    padding: 60px 40px;
  }

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

export const CTACard = styled.div`
  text-align: center;
  background: white;
  padding: 60px 40px;
  border-radius: 40px;
  max-width: 700px;
  margin: 0 auto;

  h2 {
    font-size: 32px;
    font-weight: 700;
    color: #1b5e20;
    margin-bottom: 16px;
  }

  p {
    font-size: 18px;
    color: #8ba07a;
    margin-bottom: 32px;
  }

  @media (max-width: 1024px) {
    padding: 40px 30px;
  }

  @media (max-width: 768px) {
    padding: 30px 20px;

    h2 {
      font-size: 24px;
    }

    p {
      font-size: 16px;
    }
  }
`;

export const CTAIcon = styled.div`
  margin-bottom: 24px;
  color: #4caf50;
`;

export const CTANote = styled.p`
  margin-top: 24px;
  font-size: 14px;

  span {
    color: #4caf50;
    cursor: pointer;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const MainFooter = styled.footer`
  padding: 40px 60px;
  background: #1b5e20;
  color: #a5d6a7;

  @media (max-width: 1024px) {
    padding: 30px 40px;
  }

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

export const FooterContent = styled.div`
  text-align: center;

  p {
    font-size: 14px;
  }

  @media (max-width: 768px) {
    p {
      font-size: 14px;
    }
  }
`;

export const FooterLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 16px;
  font-size: 20px;
  font-weight: 600;
  color: white;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;
