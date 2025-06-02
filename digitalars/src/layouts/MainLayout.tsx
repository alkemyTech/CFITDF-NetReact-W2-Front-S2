import * as React from 'react';
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import { Outlet } from 'react-router-dom';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-100 via-white to-slate-100">
            <Navbar />
            <main className="flex-grow"><Outlet /></main>
            <Footer />
        </div>
    );
};

export default MainLayout;