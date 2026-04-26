import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from "./pages/home";
import Header from "./features/header";

const DashboardPage = () => <div style={{padding: '20px'}}><h1>Дэшборд</h1></div>;
const NotFound = () => <div style={{padding: '20px'}}><h1>404: Страница не найдена</h1></div>;

const App = () => {
    return (
        <>
            <Header /> {}
            <Routes>
                {}
                <Route path="/" element={<HomePage />} />
                
                {}
                <Route path="/shop" element={<DashboardPage />} />
                
                {}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
