import React from "react";

import { BarChart3, Leaf, MapPin, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import * as S from "./Header.styles";

export function Header() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Tracker", icon: Leaf },
    { path: "/dashboard", label: "Dashboard", icon: BarChart3 },
    { path: "/map", label: "Map", icon: MapPin },
    { path: "/profile", label: "Profile", icon: User },
  ];

  return (
    <S.NavContainer>
      <S.NavInner>
        <S.FlexWrapper>
          <S.LogoWrapper to="/">
            <div className="logo-icon">
              <Leaf size={28} color="white" />
            </div>
            <div>
              <h1
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "var(--eco-primary)",
                  lineHeight: 1,
                }}
              >
                EcoTrack
              </h1>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "var(--muted-foreground)",
                  marginTop: "-0.25rem",
                }}
              >
                Ваш эко-путь
              </p>
            </div>
          </S.LogoWrapper>

          <S.NavLinks>
            {navItems.map((item) => {
              const isActive =
                item.path === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(item.path);

              const Icon = item.icon;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{ textDecoration: "none", position: "relative" }}
                >
                  <S.NavItemBox
                    isActive={isActive}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isActive && (
                      <S.ActiveBackground
                        layoutId="activeTab"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <Icon size={20} style={{ position: "relative", zIndex: 10 }} />
                    <span style={{ position: "relative", zIndex: 10, fontWeight: 500 }}>
                      {item.label}
                    </span>
                  </S.NavItemBox>
                </Link>
              );
            })}
          </S.NavLinks>

          <S.MobileNavLinks>
            {navItems.map((item) => {
              const isActive =
                item.path === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(item.path);
              const Icon = item.icon;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{ textDecoration: "none", position: "relative" }}
                >
                  <S.MobileNavItem isActive={isActive} whileTap={{ scale: 0.9 }}>
                    {isActive && <S.ActiveBackground />}
                    <Icon size={20} style={{ position: "relative", zIndex: 10 }} />
                  </S.MobileNavItem>
                </Link>
              );
            })}
          </S.MobileNavLinks>
        </S.FlexWrapper>
      </S.NavInner>
    </S.NavContainer>
  );
}

export default Header;
