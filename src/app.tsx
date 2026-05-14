import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from "./pages/home";
import Header from "./features/header";
import DashboardPage from "./pages/dashboard";
import Map from "./pages/map";

const NotFound = () => <div style={{padding: '20px'}}><h1>404: Страница не найдена</h1></div>;

const App = () => {
    return (
        <>
            <Header /> {}
            <Routes>
                {}
                <Route path="/" element={<HomePage />} />
                
                {}
                <Route path="/dashboard" element={<DashboardPage />} />

                {}
                <Route path="/map" element={<Map />} />

                {}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
