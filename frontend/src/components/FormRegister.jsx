import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from './Requests';

/**
 * Registration form
 * @returns form component
 */
function FormRegister() {
    //base url
    const baseUrl = 'http://localhost:5500/api/'
    // store name and pass
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const history = useNavigate();

    //after filling and register button clicked
    //this function starts functioning
    const handleRegisterSubmit = async(event) => {
        event.preventDefault();
        //post request will be sent
        await createUser(baseUrl, name, password);
        setName('');
        setPassword('');
        //redirected to login page
        history('/login');
    };

    //when login link is pressed
    //this function shows login form
    const handleRoute = () => {
        history('/login')
    };

    return (
        <div className="form-container">
            <div className="form-border">
            <div className="title">Welcome!</div>
            <form className="form" onSubmit={handleRegisterSubmit}>
                <div className="form-outline mb-4">
                    <input
                        className="form-control"
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        type="text"
                        value={name}
                    />
                </div>
                <div className="form-outline mb-4">
                    <input
                        className="form-control"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        type="password"
                        value={password}
                    />
                </div>
                <button className="btn btn-primary btn-block mb-4" type="submit">Register</button>
            </form>
                <div className="no-account">Already have an account?</div>
                <span className="text-primary" onClick={handleRoute}>Login</span>
            </div>            
        </div>
    )
}

export default FormRegister