import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, Book, MessageCircle } from "lucide-react";


export function Sidebar() {
    return (
        <aside className="w-64 bg-white dark:bg-gray-900 shadow-xl hidden md:block transition">
            <div className="p-4 font-bold text-2xl bg-indigo-600 text-white rounded-b-xl">
                Driving School
            </div>


            <nav className="mt-4 text-gray-700 dark:text-gray-300">
                <NavLink to="/dashboard" className="block px-5 py-3 hover:bg-indigo-50 dark:hover:bg-gray-800 rounded-lg mx-3 transition">
                    <LayoutDashboard className="inline w-5 h-5 mr-3" /> Dashboard
                </NavLink>


                <NavLink to="/admin/instructors" className="block px-5 py-3 hover:bg-indigo-50 dark:hover:bg-gray-800 rounded-lg mx-3 transition">
                    <Users className="inline w-5 h-5 mr-3" /> Instructors
                </NavLink>


                <NavLink to="/admin/learners" className="block px-5 py-3 hover:bg-indigo-50 dark:hover:bg-gray-800 rounded-lg mx-3 transition">
                    <Users className="inline w-5 h-5 mr-3" /> Learners
                </NavLink>


                <NavLink to="/admin/enquiries" className="block px-5 py-3 hover:bg-indigo-50 dark:hover:bg-gray-800 rounded-lg mx-3 transition">
                    <MessageCircle className="inline w-5 h-5 mr-3" /> Enquiries
                </NavLink>


                <NavLink to="/admin/lessons" className="block px-5 py-3 hover:bg-indigo-50 dark:hover:bg-gray-800 rounded-lg mx-3 transition">
                    <Book className="inline w-5 h-5 mr-3" /> Lessons
                </NavLink>
            </nav>
        </aside>
    );
}