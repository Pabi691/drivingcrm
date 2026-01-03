export function Topbar({ user, onLogout, toggleTheme }: any) {
    return (
        <header className="h-16 bg-white dark:bg-gray-900 shadow flex items-center justify-between px-6 transition">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Welcome, {user?.name}
            </h1>


            <div className="flex items-center gap-3">
                <button
                    onClick={toggleTheme}
                    className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
                >
                    Toggle Theme
                </button>


                <button
                    onClick={onLogout}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                    Logout
                </button>
            </div>
        </header>
    );
}