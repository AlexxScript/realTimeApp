import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export const LoginUser = () => {

    const contextAu = useContext(AuthContext);

    const [fields, setFields] = useState({
        userEmail: "",
        password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8080/user/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(fields)
            });
            const data = await res.json();
            contextAu.setUser({
                authenticated: true,
                email: data.email,
                role: data.role,
                idSchool:data.idSchool
            })
        } catch (error) {
            console.log(error);
        }
    }

    if (contextAu.user.authenticated === true) {
        return <Navigate to="/" replace/>
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Set your email</label>
                <input onChange={handleChange} type="email" name="userEmail" />
            </div>
            <div>
                <label>Set your password</label>
                <input onChange={handleChange} type="password" name="password" />
            </div>
            <div>
                <input type="submit" value="Log in" />
            </div>
        </form>
    )
}