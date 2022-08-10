import React from 'react';
// import navigate from router-dom
import { NavLink, useNavigate  } from 'react-router-dom';
import './Header.css';

/**
 * Header component
 * @param {user, admin} 
 * @returns 
 */
function Header({userStatus, setUserStatus, adminStatus, setAdminStatus}) {
    const history = useNavigate()

    // when logged out storage will be cleared
    // states will be change and routed to the home page
    const clearStorage = () => {
        window.localStorage.removeItem('userData');
        document.cookie = 'userName' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = 'userRole' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        setUserStatus(false)
        setAdminStatus(false)
        history('/')
    }
    return (
        <header>
            {/* navbar data will be rendered depending on user and admin statusses */}
            <nav className="navbar">
                <ul className='nav__ul'>
                    <li className="nav__ul-li">
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li className="nav__ul-li">
                        <NavLink to="/about">About</NavLink>
                    </li>
                    <li className="nav__ul-li">
                        { userStatus || adminStatus ? <NavLink to="/maps">Maps</NavLink> : <div></div> }
                    </li>
                    <li className="nav__ul-li">
                        { adminStatus ? <NavLink to="/admin">Admin</NavLink> : <div></div> }
                    </li>
                </ul>
                {/* if user or admin is name will be shown */}
                { userStatus || adminStatus ? <div>Welcome, { JSON.parse(localStorage.getItem('userData')).name }!</div> : <div></div>}
                <NavLink to="/login"><span onClick={clearStorage}>{userStatus || adminStatus ? "Logout" : "Login"}</span></NavLink>
            </nav>
        </header>
    )
};

export default Header;
