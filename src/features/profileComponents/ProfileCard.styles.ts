import styled from "@emotion/styled";

export const ProfileCardWrapper = styled.div`
  max-width: 360px;
  width: 100%;
  margin: 0;
  padding: 24px 20px 32px;
  background: #ffffff;
  border-radius: 28px;
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
`;

export const ProfileName = styled.h1`
  font-size: 26px;
  font-weight: 600;
  color: #1b5e20;
  margin: 16px 0 6px 0;
`;

export const ProfileStatus = styled.p`
  font-size: 13px;
  color: #6b8c42;
  margin-bottom: 12px;
  font-weight: 400;
`;

export const ProfileStats = styled.div`
  display: flex;
  justify-content: center;
  gap: 48px;
  background: #f5f7f0;
  padding: 18px 20px;
  border-radius: 20px;
  margin-bottom: 12px;
`;

export const StatItem = styled.div`
  text-align: center;
`;

export const StatValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #4caf50;
  line-height: 1.2;
  margin-bottom: 4px;
`;

export const StatLabel = styled.div`
  font-size: 11px;
  color: #7b8c6e;
  font-weight: 600;
  letter-spacing: 0.8px;
`;

export const ProfileLevel = styled.div`
  background: #f5f7f0;
  padding: 14px 20px;
  border-radius: 20px;
`;

export const LevelTitle = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: #1b5e20;
  margin: 0 0 4px 0;
`;

export const LevelSubtitle = styled.p`
  font-size: 11px;
  color: #7b8c6e;
  margin: 0;
  font-weight: 500;
  letter-spacing: 0.8px;
`;
