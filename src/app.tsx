import { Route, Routes } from "react-router-dom";

import { BackgroundLeaves } from "./components/BackgroundLeaves";
import { AuthForm } from "./features/auth/AuthForm";
import Header from "./features/header";
import DashboardPage from "./pages/dashboard/DashboardPage";
import HomePage from "./pages/home/HomePage";
import MainPage from "./pages/main/MainPage";
import MapPage from "./pages/map/MapPage";
import ProfilePage from "./pages/profile/ProfilePage";
import { useAppSelector } from "./store/hooks";

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

        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  );
};

export default App;
