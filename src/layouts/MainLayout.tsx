import React, { useState } from "react";
import Navbar from "../components/Navbar";
import AdminPanelBar from "../components/AdminPanelBar";
import { useAuth } from "../context/AuthContext";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/ui/SideBar";
const drawerWidth = 200;
const MainLayout = () => {
    const { rol, isAuthenticated } = useAuth();
    const location = useLocation();
    const [adminPanelOpen, setAdminPanelOpen] = useState(false);

    const onToggleAdminPanel = () => setAdminPanelOpen(!adminPanelOpen);

    const noNavbarRoutes = ["/login", "/register"];
    const showNavbar = isAuthenticated && !noNavbarRoutes.includes(location.pathname);
    const showSidebar = isAuthenticated && !noNavbarRoutes.includes(location.pathname);

    // Medidas compartidas con AdminPanelBar y Navbar
    const navbarHeight = 64;
    const sidebarWidth = 240;
    const adminPanelHeight = 48; // altura del AdminPanelBar

    // Calculo el margen izquierdo para el contenido principal (Outlet)
    // El adminPanel no ocupa ancho, solo altura, por eso no sumamos adminPanelWidth aquí
    const marginLeft = showSidebar ? sidebarWidth : 0;

    // Padding top: sumamos navbarHeight + adminPanelHeight si el panel está abierto
    const paddingTop = navbarHeight + (adminPanelOpen ? adminPanelHeight : 0);

    return (
        <div className="flex min-h-screen flex-col">
            {showNavbar && (
                <Navbar
                    adminPanelOpen={adminPanelOpen}
                    onToggleAdminPanel={onToggleAdminPanel}
                />
            )}

            {/* Paso las medidas al AdminPanelBar */}
            {adminPanelOpen && (
                <AdminPanelBar drawerWidth={drawerWidth} navbarHeight={navbarHeight} />

            )}

            <div className="flex flex-1">
                {showSidebar && <Sidebar />}
                <main
                    className="flex-1 p-6"
                    style={{
                        marginLeft: `${marginLeft}px`,
                        paddingTop: `${paddingTop}px`,
                    }}
                >
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;