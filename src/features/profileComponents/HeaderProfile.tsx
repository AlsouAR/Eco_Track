import React from "react";

export default function Header() {
  const styles: { [key: string]: React.CSSProperties } = {
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "16px",
      marginBottom: "28px",
    },
    textWrapper: {
      textAlign: "center",
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: "4px",
    },
    title: {
      fontSize: "40px",
      fontWeight: 650,
      color: "#1B5E20",
      margin: 0,
      lineHeight: 1.3,
    },
    subtitle: {
      fontSize: "20px",
      color: "#6B8C42",
      margin: 0,
      fontWeight: 500,
    },
  };

  return (
    <header style={styles.header}>
      <div style={styles.textWrapper}>
        <h1 style={styles.title}>Профиль</h1>
        <h3 style={styles.subtitle}>Настройте свой эко-трекер</h3>
      </div>
    </header>
  );
}
