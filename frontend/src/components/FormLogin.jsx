import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Form.css';
import { signIn } from './Requests';

/**
 * Login form
 * @returns login form 
 */
function FormLogin({ setUserStatus, setAdminStatus }) {
    //base url
    const baseUrl = 'http://localhost:5500/api/'

    //store name and pass
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const history = useNavigate()
    //when login is pressed request will be sent and checked if user exists
    const handleLoginSubmit = async(event) => {
        event.preventDefault()
        const loginStatus =  await signIn(baseUrl, name, password);
        setName('')
        setPassword('')
        // if user successfully signs redirect to home page
        if (localStorage.getItem('userData') !== null && loginStatus === true) {
            setUserStatus(true);
            history('/')
        } else if (localStorage.getItem('userData') !== null && loginStatus === 'admin') {
            // if admin signs redirect to admin page
            setAdminStatus(true);
            history('/admin')
        } else {
            console.log('incorrect')
        }
    }

    //register form shows
    const handleRoute = () => {
        history('/register')
    }

    return (
        <div className="form-container">
            <div className="form-border">
                <div className="title">Welcome!</div>
                <form className="form" onSubmit={handleLoginSubmit}>
                    <div className="form-outline mb-4">
                        <input
                            className="form-control"
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                            type="text"
                            value={name}
                            required
                        />
                    </div>
                    <div className="form-outline mb-4">
                        <input
                            className="form-control"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            type="password"
                            value={password}
                            required
                        />
                    </div>            
                    <button className="btn btn-primary btn-block mb-4" type="submit">Login</button>
                </form>
                <div className="no-account" style={{ width: '100%' }}>Have no account yet?</div>
                <Link to="/register">
                    <span className="text-primary" onClick={handleRoute}>Register</span>
                </Link>
            </div>      
        </div>
    )
}

export default FormLogin;
