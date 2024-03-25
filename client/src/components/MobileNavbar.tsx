import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logoutRequest from '../api/logoutRequest';
import '../assets/css/style.css'

type MobileNavbarProps = {
    className?: string;
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({className}) => {
    const navigate = useNavigate();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    const handleLogout = () => {
        const refreshToken = localStorage.getItem('refreshToken')!;

        logoutRequest(refreshToken)
            .then(() => {
                // Redirect the user to the login page or perform any other action after successful logout
                navigate('/');
            })
            .catch(err => {
                console.error(err);
            });
    }

    return (
        <div className={`mobile-navbar ${className}`}>
            <div className="mobile-navbar-header-logo">
                <a href="/" className="b-brand mobile-navbar-header-logo">
                    <div className="b-bg" id='mobile-navbar-logo-link'>
                        <i className="feather icon-sun"></i>
                    </div>
                    <span className="b-title mobile-navbar-logo-title">
                        Gear Gremlin
                    </span>
                </a>
            </div>
            <div className="mobile-navbar-content mobile-navbar-content-full">
                <ul className="mobile-navbar-content-list">
                    {/* <li className="mobile-navbar-item mobile-navbar-item-label">
                        Gear Inventory
                    </li> */}
                    <li className="mobile-navbar-item">
                        <NavLink to="/items" className={({ isActive }) =>
                            isActive ? "mobile-navbar-link b-brand active" : "mobile-navbar-link b-brand"
                        }>
                            <span className="mobile-navbar-icon"><i className="feather icon-home"></i></span>
                            <span className="b-title">Gear Dashboard</span>
                        </NavLink>
                    </li>
                    {/* <li className="mobile-navbar-item mobile-navbar-item-label">
                        Trip Inventory
                    </li> */}
                    <li className="mobile-navbar-item">
                        <NavLink to="/trips" className={({ isActive }) =>
                            isActive ? "mobile-navbar-link b-brand active" : "mobile-navbar-link b-brand"
                        }>
                            <span className="mobile-navbar-icon"><i className="feather icon-map-pin"></i></span>
                            <span className="mobile-navbar-text b-title">Trip Dashboard</span>
                        </NavLink>
                    </li>
                    {/* <li className="mobile-navbar-item mobile-navbar-item-label">
                        Ready to leave?
                    </li> */}
                    <li className="mobile-navbar-item">
                        <NavLink to="/changePassword" className={({ isActive }) =>
                            isActive ? "mobile-navbar-link b-brand active" : "mobile-navbar-link b-brand"
                        }>
                            <span className="mobile-navbar-icon"><i className="feather icon-user"></i></span>
                            <span className="b-title">Change Password</span>
                        </NavLink>
                    </li>
                    <li className="mobile-navbar-item" onClick={handleLogout}>
                        <NavLink to='/' className="mobile-navbar-link b-brand">
                            <span className="mobile-navbar-icon"><i className="feather icon-log-out"></i></span>
                            <span className="mobile-navbar-text b-title">Logout</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="mobile-navbar-content-under-600 b-brand">
                    <button id='mobile-dropdown-button' className="b-title" onClick={toggleDropdown}>
                        {isDropdownOpen ? 'X' : '☰' }
                    </button>
                    {isDropdownOpen && (
                        <ul className="mobile-navbar-content-list mobile-navbar-dropdown-menu">
                            <li className='mobile-dropdown-list-item'>
                                <NavLink to="/items">
                                    <span className="mobile-navbar-icon"><i className="feather icon-home"></i></span>
                                    <span className="b-title">Gear Dashboard</span>
                                </NavLink>
                            </li>
                            <li className='mobile-dropdown-list-item'>
                                <NavLink to="/trips">
                                    <span className="mobile-navbar-icon"><i className="feather icon-map-pin"></i></span>
                                    <span className="mobile-navbar-text b-title">Trip Dashboard</span>
                                </NavLink>
                            </li>
                            <li className="mobile-dropdown-list-item">
                                <NavLink to="/changePassword" className={({ isActive }) =>
                                    isActive ? "mobile-navbar-link b-brand active" : "mobile-navbar-link b-brand"
                                }>
                                    <span className="mobile-navbar-icon"><i className="feather icon-user"></i></span>
                                    <span className="b-title">Change Password</span>
                                </NavLink>
                            </li>
                            <li className='mobile-dropdown-list-item' onClick={handleLogout}>
                                <NavLink to='/' className="mobile-navbar-link b-brand">
                                    <span className="mobile-navbar-icon"><i className="feather icon-log-out"></i></span>
                                    <span className="mobile-navbar-text b-title">Logout</span>
                                </NavLink>
                            </li>
                        </ul>
                    )}
            </div>
        </div>
    )
}

export default MobileNavbar;
