import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, Navigate } from 'react-router-dom';
import { NavBar } from '../components/NavBar';

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
            if (data.message === 'succes') {
                contextAu.setUser({
                    authenticated: true,
                    email: data.email,
                    role: data.role,
                    idSchool: data.idSchool,
                    idUser: data.idUser
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (contextAu.user.authenticated === true) {
        return <Navigate to="/" replace />
    }

    return (
        <>
            <NavBar/>
            <div className="bg-white">
                <div className="flex h-screen flex-col items-center justify-center">
                    <div className="rounded-md border-2 border-[#e25c148a] p-5 max-h-auto mx-auto w-4/6 max-w-xl">
                        <div className="mb-8 space-y-3">
                            <p className="text-xl font-semibold">Login</p>
                            <p className="text-gray-500">Enter your email to log in</p>
                        </div>
                        <form className="w-full" onSubmit={handleSubmit}>
                            <div className="mb-10 space-y-3">
                                <div className="space-y-1">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
                                        <input 
                                            className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                                            placeholder="mail@example.com" 
                                            onChange={handleChange} 
                                            type="email" 
                                            name="userEmail"/>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Password</label>
                                        <input 
                                            className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                                            id="password" 
                                            type='password'
                                            placeholder="your password" 
                                            name="password" 
                                            onChange={handleChange}/>
                                    </div>
                                </div>
                                <button className="ring-offset-background focus-visible:ring-ring flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-[#e25d14] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#bb4613] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" type="submit">Login</button>
                            </div>
                        </form>
                        <div className="text-center"> No account? <Link className="text-[#e25d14]" to="/register">Create one</Link> </div>
                    </div>
                </div>
            </div>
        </>
    )
}