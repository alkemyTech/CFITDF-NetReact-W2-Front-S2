import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import * as React from "react";

export default function MainLayout() {
    return (
        <>
            <Navbar />
            <main style={{ padding: "2rem" }}>
                <Outlet />
            </main>
        </>
    );
}
