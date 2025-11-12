import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "@/components/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Header: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);

    // Monitor auth state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    // Logout function
    const handleLogout = async () => {
        await signOut(auth);
        navigate("/logout");
    };

    return (
        <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
            <div className="container w-full gap-10 px-8 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo & Brand */}
                    <div
                        onClick={() => navigate("/")}
                        className="flex items-center gap-10 ml-10 p-4 px-4 cursor-pointer"
                    >
                        <div className="text-primary size-7 m-4">
                            <svg
                                fill="none"
                                viewBox="0 0 48 48"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                            CareerPath
                        </h2>
                    </div>

                    {/* Navigation Links */}
                    <nav className="hidden md:flex items-center gap-8">
                        {[
                        
                            
                            ["AI-Setu", "/scan"],
                            ["Dairy", "/dashboard"],
                            ["Check-Performance", "/resources"],
                            ["Progress-Report","/reports"]
                        ].map(([item, href]) => (
                            <a
                                key={item}
                                href={href}
                                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors"
                            >
                                {item}
                            </a>
                        ))}
                    </nav>

                    {/* Action Buttons / User Profile */}
                    <div className="m-4 hidden md:flex items-center gap-4">
                        {user ? (
                            <>
                                <div className="flex items-center gap-2">
                                    <img
                                        src={user.photoURL || "https://www.shutterstock.com/image-vector/reaching-success-people-logo-icon-design-2617607515"}
                                        alt="User"
                                        className="w-10 h-10 rounded-full border"
                                    />
                                    <span className="text-sm font-semibold text-slate-800 dark:text-white">
                                        {user.displayName || user.email}
                                    </span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 text-sm font-bold text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => navigate("/signup")}
                                    className="px-4 py-2 text-sm font-bold text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
                                >
                                    Get Started
                                </button>
                                <button
                                    onClick={() => navigate("/login")}
                                    className="px-4 py-2 text-sm font-bold text-slate-800 dark:text-white bg-slate-200 dark:bg-slate-700 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                                >
                                    Log In
                                </button>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700">
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M4 6h16M4 12h16m-7 6h7"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
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