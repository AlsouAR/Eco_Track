import styled from "@emotion/styled";

export const ReportPreviewWrapper = styled.div`
  background: #2e7d32;
  border-radius: 28px;
  padding: 24px 20px 32px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  width: 100%;
`;

export const ReportHeader = styled.div`
  background: #2e7d32;
  border-radius: 24px;
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const ReportHeaderIcon = styled.div`
  width: 56px;
  height: 56px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ReportHeaderText = styled.div`
  flex: 1;
`;

export const ReportHeaderTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 6px 0;
`;

export const ReportHeaderSubtitle = styled.p`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
  line-height: 1.4;
`;

export const ReportCard = styled.div`
  background: #f8faf4;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 24px;
  border: 1px solid #e8ede0;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
`;

export const PreviewHeader = styled.div`
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 2px solid #e0e8d3;
`;

export const PreviewMonth = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #7b8c6e;
  margin: 0 0 4px 0;
  letter-spacing: 0.5px;
`;

export const PreviewTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #1b5e20;
  margin: 0;
`;

export const PreviewStats = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
`;

export const PreviewStat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding: 8px 0;
  text-align: center;
`;

export const PreviewStatInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export const PreviewStatValue = styled.span`
  font-size: 24px;
  font-weight: 800;
  color: #2e7d32;
`;

export const PreviewStatLabel = styled.span`
  font-size: 11px;
  color: #7b8c6e;
  font-weight: 500;
`;

export const DownloadButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 14px 20px;
  background: #4caf50;
  border: none;
  border-radius: 20px;
  font-size: 15px;
  font-weight: 600;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;

  &:hover {
    background: #3d9c41;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    color: #ffffff;
  }
`;

export const HiddenPdfWrapper = styled.div`
  position: absolute;
  left: -9999px;
  top: 0;
`;

export const PdfHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

export const PdfMainTitle = styled.h1`
  color: #1b5e20;
  font-size: 28px;
  margin-bottom: 8px;
`;

export const PdfMonthTitle = styled.h2`
  color: #ff9800;
  font-size: 20px;
  margin-bottom: 8px;
`;

export const PdfUserSubtitle = styled.p`
  color: #7b8c6e;
`;

export const PdfDivider = styled.hr`
  border: 1px solid #e8eed9;
  margin: 20px 0;
`;

export const StatsSection = styled.div`
  margin-bottom: 30px;
`;

export const StatsTitle = styled.h3`
  color: #1b5e20;
  font-size: 18px;
  margin-bottom: 16px;
`;

export const StatsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const StatsLabel = styled.td`
  padding: 8px 0;
  border-bottom: 1px solid #e8eed9;
`;

export const StatsValue = styled.td`
  text-align: right;
  font-weight: bold;
`;

export const DValue = styled.div`
  text-align: left;
  font-weight: bold;
`;

export const PdfFooter = styled.div`
  text-align: center;
  margin-top: 40px;
  padding: 20px;
  background: #f5f7f0;
  border-radius: 16px;
`;

export const PdfFooterTitle = styled.p`
  font-size: 16px;
  margin-bottom: 8px;
`;

export const PdfFooterSubtitle = styled.p`
  font-size: 12px;
  color: #7b8c6e;
`;
