import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const NavContainer = styled.nav`
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 50;
`;

export const NavInner = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 1.5rem;
  @media (min-width: 1024px) {
    padding: 0 3rem;
  }
`;

export const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5rem;
`;

export const LogoWrapper = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;

  .logo-icon {
    width: 3rem;
    height: 3rem;
    border-radius: 1rem;
    background: linear-gradient(to bottom right, var(--eco-primary), var(--eco-accent));
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.2s;
  }

  &:hover .logo-icon {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }
`;

export const NavLinks = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

export const NavItemBox = styled(motion.div)<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 0.75rem;
  position: relative;
  transition: all 0.2s;
  color: ${(props) => (props.isActive ? "#ffffff" : "var(--foreground)")};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.isActive ? "transparent" : "rgba(200, 230, 201, 0.3)")};
  }
`;

export const ActiveBackground = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, var(--eco-primary), var(--eco-accent));
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

export const MobileNavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  @media (min-width: 768px) {
    display: none;
  }
`;

export const MobileNavItem = styled(motion.div)<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  position: relative;
  transition: all 0.2s;
  color: ${(props) => (props.isActive ? "#ffffff" : "var(--foreground)")};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.isActive ? "transparent" : "rgba(200, 230, 201, 0.3)")};
  }
`;
