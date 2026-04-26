import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { Leaf, LayoutDashboard, Map, User } from 'lucide-react';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 40px;
  background: linear-gradient(to bottom, var(--eco-gradient-start), #ffffff);
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(8px);
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }
`;

const IconCircle = styled.div`
  background: var(--primary);
  width: 44px;
  height: 44px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-foreground);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.2);
`;

const LogoTextContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const LogoTitle = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: var(--foreground);
  letter-spacing: -0.5px;
  line-height: 1.1;
`;

const LogoSubtitle = styled.div`
  font-size: 12px;
  color: var(--muted-foreground);
  font-weight: 400;
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  gap: 12px;
  margin: 0;
  padding: 0;
`;

interface NavLinkProps {
  isActive?: boolean;
}

const NavButton = styled.button<NavLinkProps>`
  display: flex;
  align-items: center;
  gap: 10px;
  background: ${({ isActive }) => (isActive ? 'var(--primary)' : 'transparent')};
  border: none;
  padding: 12px 24px;
  cursor: pointer;
  font-size: 16px;
  font-weight: var(--font-weight-medium);
  color: ${({ isActive }) => (isActive ? 'var(--primary-foreground)' : 'var(--foreground)')};
  border-radius: var(--radius);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  box-shadow: ${({ isActive }) => 
    isActive ? '0 10px 15px -3px rgba(76, 175, 80, 0.3)' : 'none'};

  &:hover {
    background-color: ${({ isActive }) => (isActive ? 'var(--accent)' : 'var(--sidebar-accent)')};
    transform: translateY(-2px);
  }

  svg {
    width: 20px;
    height: 20px;
    stroke-width: 2.5px;
  }
`;

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { id: 'tracker', label: 'Tracker', path: '/', icon: Leaf },
        { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { id: 'map', label: 'Map', path: '/map', icon: Map },
        { id: 'profile', label: 'Profile', path: '/profile', icon: User },
    ];

    return (
        <HeaderContainer>
            <LogoWrapper onClick={() => navigate('/')}>
                <IconCircle className="neo-card">
                    <Leaf size={26} fill="currentColor" />
                </IconCircle>
                <LogoTextContent>
                    <LogoTitle>EcoTrack</LogoTitle>
                    <LogoSubtitle>Ваш эко-путь</LogoSubtitle>
                </LogoTextContent>
            </LogoWrapper>

            <nav>
                <NavList>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <li key={item.id}>
                                <NavButton 
                                    isActive={isActive}
                                    onClick={() => navigate(item.path)}
                                >
                                    <Icon /> 
                                    {item.label}
                                </NavButton>
                            </li>
                        );
                    })}
                </NavList>
            </nav>
        </HeaderContainer>
    );
};

export default Header;