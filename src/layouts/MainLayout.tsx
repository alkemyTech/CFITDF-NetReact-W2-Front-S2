import React from "react";
import Navbar from "../components/Navbar";
import AdminPanelBar from "../components/AdminPanelBar";
import { useAuth } from "../context/AuthContext";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/ui/SideBar"; // ¡Asegurate de que el nombre del archivo esté bien!

const MainLayout = () => {
    const { rol, isAuthenticated } = useAuth();
    const location = useLocation();

    const showAdminSidebar = rol === "BANCO" && location.pathname.startsWith("/admin");

    // No mostrar navbar ni sidebar en login o register
    const noNavbarRoutes = ["/login", "/register"];
    const showNavbar = isAuthenticated && !noNavbarRoutes.includes(location.pathname);
    const showSidebar = isAuthenticated && !noNavbarRoutes.includes(location.pathname);

    // Definir anchos fijos para sidebar y adminpanel
    const sidebarWidth = 240;
    const adminPanelWidth = 256;

    // Calcular margen izquierdo dinámico según qué sidebars estén visibles
    let marginLeft = 0;
    if (showSidebar) marginLeft += sidebarWidth;
    if (showAdminSidebar) marginLeft += adminPanelWidth;

    return (
        <div className="flex min-h-screen flex-col">
            {showNavbar && <Navbar />}
            <div className="flex flex-1">
                {/* Renderizar Sidebar si corresponde */}
                {showSidebar && <Sidebar />}

                {/* Renderizar AdminPanelBar si corresponde */}
                {showAdminSidebar && <AdminPanelBar />}

                {/* Contenido principal, con margen dinámico a la izquierda */}
                <main
                    className="flex-1 p-6"
                    style={{ marginLeft: `${marginLeft}px` }}
                >
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;