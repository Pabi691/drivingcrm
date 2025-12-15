import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { useState, useEffect } from "react";


export default function DashboardLayout({ user, onLogout, children }: any) {
    const [theme, setTheme] = useState("light");


    const toggleTheme = () => {
        const html = document.documentElement;

        if (html.classList.contains("dark")) {
            html.classList.remove("dark");
            localStorage.setItem("theme", "light");
        } else {
            html.classList.add("dark");
            localStorage.setItem("theme", "dark");
        }
    };


    useEffect(() => {
        const saved = localStorage.getItem("theme") || "light";
        setTheme(saved);
    }, []);


    useEffect(() => {
        if (theme === "dark") document.documentElement.classList.add("dark");
        else document.documentElement.classList.remove("dark");
    }, [theme]);


    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-950 transition">
            <Sidebar />


            <div className="flex-1 flex flex-col">
                <Topbar user={user} onLogout={onLogout} toggleTheme={toggleTheme} />


                <main className="p-6 overflow-y-auto text-gray-900 dark:text-gray-100">
                    {children}
                </main>
            </div>
        </div>
    );
}