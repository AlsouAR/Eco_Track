import { Routes, Route } from "react-router-dom";
import { useAppSelector } from "./store/hooks";
import HomePage from "./pages/home/HomePage";
import Header from "./features/header";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ProfilePage from "./pages/profile/ProfilePage";
import MapPage from "./pages/map/MapPage";
import { BackgroundLeaves } from "./components/BackgroundLeaves";
import { AuthForm } from "./features/auth/AuthForm";
import MainPage from "./pages/main/MainPage";

const NotFound = () => (
  <div style={{ padding: "20px" }}>
    <h1>404: Страница не найдена</h1>
  </div>
);

const App = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return (
      <>
        <BackgroundLeaves />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<AuthForm />} />
        </Routes>
      </>
    );
  }

  return (
    <>
      <BackgroundLeaves />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/dashboard" element={<DashboardPage />} />

        <Route path="/map" element={<MapPage />} />

        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/main" element={<MainPage />} />
        <Route path="/auth" element={<AuthForm />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
