import { useState, useEffect } from 'react';

const Navbar = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        setLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setLoggedIn(false);
        window.location.href = '/login';
    };

    return (
        <div className="navbar">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                </div>
                <a href="/" className="btn btn-ghost text-xl">LIBRARY</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><a href="/libraries">Könyvtárak</a></li>
                    <li><a href="/books">Könyvek</a></li>
                    <li><a href="/members">Tagok</a></li>
                </ul>
            </div>
            <div className="navbar-end">
                {!loggedIn && (
                    <>
                        <a className="btn mr-2" href="/login">
                            Bejelentkezés
                        </a>
                        <a className="btn btn-primary" href="/register">
                            Regisztráció
                        </a>
                    </>
                )}
                {loggedIn && (
                    <button className="btn btn-ghost" onClick={handleLogout}>
                        Kijelentkezés
                    </button>
                )}
            </div>
        </div>
    );
};

export default Navbar;
