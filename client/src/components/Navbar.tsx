import { NavLink, useNavigate } from 'react-router-dom';
import logoutRequest from '../api/logoutRequest';
import '../assets/css/style.css'

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
        const refreshToken = localStorage.getItem('refreshToken')!;

        logoutRequest(refreshToken)
            .then(() => {
                // Redirect the user to the login page or perform any other action after successful logout
                navigate('/');
            })
            .catch(err => {
                console.error(err);
            });
    };

    return (
        <nav className="pcoded-navbar">
            <div className="navbar-wrapper">
                <div className="navbar-brand header-logo">
                    <a href="/" className="b-brand">
                        <div className="b-bg">
                            <i className="feather icon-sun"></i>
                        </div>
                        <span className="b-title">Gear Gremlin</span>
                    </a>
                </div>
                <div className="navbar-content scroll-div">
                    <ul className="nav pcoded-inner-navbar">
                        <li className="nav-item pcoded-menu-caption">
                            <label>Gear Inventory</label>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/items" className={({ isActive }) =>
                                isActive ? "nav-link active" : "nav-link"
                            }>
                                <span className="pcoded-micon"><i className="feather icon-home"></i></span>
                                <span className="pcoded-mtext">Gear Dashboard</span>
                            </NavLink>
                        </li>
                        <li className="nav-item pcoded-menu-caption">
                            <label>Trip Inventory</label>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/trips" className={({ isActive }) =>
                                isActive ? "nav-link active" : "nav-link"
                            }>
                                <span className="pcoded-micon"><i className="feather icon-map-pin"></i></span>
                                <span className="pcoded-mtext">Trip Dashboard</span>
                            </NavLink>
                        </li>
                        <li className="nav-item pcoded-menu-caption">
                            <label>Need to change your password?</label>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/changePassword" className={({ isActive }) =>
                                isActive ? "nav-link active" : "nav-link"
                            }>
                                <span className="pcoded-micon"><i className="feather icon-user"></i></span>
                                <span className="pcoded-mtext">Update Password</span>
                            </NavLink>
                        </li>
                        <li className="nav-item pcoded-menu-caption">
                            <label>Ready to leave?</label>
                        </li>
                        <li className="nav-item" onClick={handleLogout}>
                            <NavLink to='/' className="nav-link">
                                <span className="pcoded-micon"><i className="feather icon-log-out"></i></span>
                                <span className="pcoded-mtext logout-button">Logout</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;