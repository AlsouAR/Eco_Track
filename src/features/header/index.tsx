import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { Leaf, BarChart3, MapPin, User } from "lucide-react";
import { motion } from "framer-motion";
import styled from "@emotion/styled";

const NavContainer = styled.nav`
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 50;
`;

const NavInner = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 1.5rem;
  @media (min-width: 1024px) {
    padding: 0 3rem;
  }
`;

const FlexWrapper = styled.div`
  display: flex;
  items-center: center;
  justify-content: space-between;
  height: 5rem; /* h-20 */
`;

const LogoWrapper = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;

  .logo-icon {
    width: 3rem;
    height: 3rem;
    border-radius: 1rem; /* rounded-2xl */
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

const NavLinks = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const NavItemBox = styled(motion.div)<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 0.75rem;
  position: relative;
  transition: all 0.2s;
  color: ${props => props.isActive ? '#ffffff' : 'var(--foreground)'};
  cursor: pointer;

  &:hover {
    background-color: ${props => props.isActive ? 'transparent' : 'rgba(200, 230, 201, 0.3)'};
  }
`;

const ActiveBackground = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, var(--eco-primary), var(--eco-accent));
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;


export function Header() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Tracker", icon: Leaf },
    { path: "/dashboard", label: "Dashboard", icon: BarChart3 },
    { path: "/map", label: "Map", icon: MapPin },
    { path: "/profile", label: "Profile", icon: User },
  ];

  return (
    <NavContainer>
      <NavInner>
        <FlexWrapper>
          
          {/* Logo */}
          <LogoWrapper to="/">
            <div className="logo-icon">
              <Leaf size={28} color="white" />
            </div>
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--eco-primary)', lineHeight: 1 }}>
                EcoTrack
              </h1>
              <p style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', marginTop: '-0.25rem' }}>
                Ваш эко-путь
              </p>
            </div>
          </LogoWrapper>

          {/* Navigation Links */}
          <NavLinks>
            {navItems.map((item) => {
              const isActive = item.path === "/" 
                ? location.pathname === "/" 
                : location.pathname.startsWith(item.path);
              
              const Icon = item.icon;

              return (
                <Link key={item.path} to={item.path} style={{ textDecoration: 'none', position: 'relative' }}>
                  <NavItemBox
                    isActive={isActive}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isActive && (
                      <ActiveBackground
                        layoutId="activeTab"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <Icon size={20} style={{ position: 'relative', zIndex: 10 }} />
                    <span style={{ position: 'relative', zIndex: 10, fontWeight: 500 }}>
                      {item.label}
                    </span>
                  </NavItemBox>
                </Link>
              );
            })}
          </NavLinks>

        </FlexWrapper>
      </NavInner>
    </NavContainer>
  );
}

export default Header;