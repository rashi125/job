import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "@/components/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { motion } from "framer-motion";

const Header: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);

    // 🔄 Monitor auth state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    // 🚪 Logout
    const handleLogout = async () => {
        await signOut(auth);
        navigate("/logout");
    };

    return (
        <header className="text-gray-900 sticky top-0 z-50 bg-graypurple-400/100 dark:bg-slate-900/60 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm w-screen overflow-x-hidden">
            <div className="max-w-7xl mx-auto px-6 sm:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* 🌈 Logo */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        onClick={() => navigate("/")}
                        className="flex items-center gap-3 cursor-pointer"
                    >
                        <div className="text-indigo-600 dark:text-indigo-400 size-8">
                            <svg
                                fill="currentColor"
                                viewBox="0 0 48 48"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                            CareerPath
                        </h2>
                    </motion.div>

                    {/* 🧭 Navigation Links */} 
                    <nav className="hidden md:flex items-center gap-8">
                        {[
                            ["About Us", "/about"],
                            ["How it Works", "/career"],
                            ["AI-Setu", "/scan"],
                            ["Dairy", "/dashboard"],
                            ["Check-Performance", "/resources"],
                            ["Progress-Report", "/reports"],
                        ].map(([label, href]) => (
                            <motion.a
                                key={label}
                                href={href}
                                whileHover={{ scale: 1.1 }}
                                className="relative text-sm font-medium text-gray-700 dark:text-gray-300 
                           hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors
                           after:content-[''] after:absolute after:-bottom-1 after:left-0 
                           after:w-0 hover:after:w-full after:h-0.5 after:bg-indigo-500 
                           after:transition-all after:duration-300"
                            >
                                {label}
                            </motion.a>
                        ))}
                    </nav>

                    {/* 👤 User / Auth Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        {user ? (
                            <>
                                <div className="flex items-center gap-2 bg-gray-100/50 dark:bg-gray-800/60 px-3 py-1 rounded-xl">
                                    <img
                                        src={user.photoURL || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                                        alt="User"
                                        className="w-9 h-9 rounded-full border border-gray-300"
                                    />
                                    <span className="text-sm font-semibold text-gray-900 dark:text-white truncate max-w-[140px]">
                                        {user.displayName || user.email}
                                    </span>
                                </div>
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleLogout}
                                    className="px-4 py-2 text-sm font-bold text-white bg-red-500 
                             rounded-lg shadow-md hover:bg-red-600 transition"
                                >
                                    Logout
                                </motion.button>
                            </>
                        ) : (
                            <>
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate("/signup")}
                                    className="px-4 py-2 text-sm font-bold text-white bg-indigo-600 
                             rounded-lg shadow-md hover:bg-indigo-700 transition"
                                >
                                    Get Started
                                </motion.button>

                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate("/login")}
                                    className="px-4 py-2 text-sm font-bold text-gray-800 dark:text-white 
                             bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 
                             dark:hover:bg-gray-600 transition"
                                >
                                    Log In
                                </motion.button>
                            </>
                        )}
                    </div>

                    {/* 📱 Mobile Menu Button */}
                    <div className="md:hidden">
                        <button className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
