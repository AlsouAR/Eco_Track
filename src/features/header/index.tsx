import React from 'react';
import { useChangeRoute, useRoute } from '../../components/routing';
import styled from '@emotion/styled';
import { Leaf, LayoutDashboard, Map, User } from 'lucide-react';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: #fff;
`;

const LogoWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
`;

const IconCircle = styled.div`
  background: #63b36d;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 4px 12px rgba(99, 179, 109, 0.3);
`;

const LogoTitle = styled.div`
    font-size: 22px;
    font-weight: bold;
    color: #2d7a4d;
    line-height: 1;
`;

const LogoSubtitle = styled.div`
  font-size: 11px;
  color: #888;
  margin-top: 2px;
`;

const NavList = styled.ul`
    display: flex;
    list-style: none;
    gap: 20px;
    margin: 0;
    padding: 0;
`;

interface NavLinkProps {
  isActive?: boolean;
}

const NavButton = styled.button<NavLinkProps>`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  color: ${({ isActive }) => (isActive ? 'white' : '#2d7a4d')};
  background-color: ${({ isActive }) => (isActive ? '#63b36d' : 'transparent')};
  border-radius: 50px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${({ isActive }) => (isActive ? '#56a25f' : '#f0f7f1')};
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const Header = () => {

    const changeRoute = useChangeRoute();
    const currentRoute = useRoute();

    const handleNavigate = (path: string) => (e: React.MouseEvent) =>{
        e.preventDefault();
        changeRoute(path);
    };

    const navItems = [
        { id: 'tracker', label: 'Tracker', path: '/tracker', icon: Leaf },
        { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { id: 'map', label: 'Map', path: '/map', icon: Map },
        { id: 'profile', label: 'Profile', path: '/profile', icon: User },
    ];

    return (
        <HeaderContainer>
            <LogoWrapper onClick={handleNavigate('/')}>
                <IconCircle>
                    <Leaf size={24} fill="currentColor" />
                </IconCircle>
                <div>
                    <LogoTitle>EcoTrack</LogoTitle>
                    <LogoSubtitle>Ваш эко-путь</LogoSubtitle>
                </div>
            </LogoWrapper>

            <nav>
                <NavList>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li key={item.id}>
                                <NavButton 
                                    isActive={currentRoute === item.path}
                                    onClick={handleNavigate(item.path)}
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