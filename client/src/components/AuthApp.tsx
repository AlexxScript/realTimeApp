import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { App } from '../App';
import { LoginUser } from '../pages/LogInUser';
import { RegisterUser } from '../pages/RegisterUser';
import { RegisterSchool } from '../pages/RegisterSchool';
import { AuthContext } from '../context/AuthContext';
import { Dashboard } from '../pages/Dashboard';
import { ManageOrders } from '../pages/ManageOrders';
import { ManageLunch } from '../pages/ManageLunch';
import { FormCreateLunch } from './FormCreateLunch';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    }, {
        path: "/login",
        element: <LoginUser />
    }, {
        path: "/register",
        element: <RegisterUser />
    }, {
        path: "/newschool",
        element: <RegisterSchool />
    },{
        path:"/dashboard",
        element: <Dashboard/>,
        children:[
            {
                path:'/dashboard',
                element:<ManageOrders/>
            }, {
                path: '/dashboard/manage',
                element:<ManageLunch/>
            }, {
                path: '/dashboard/create',
                element:<FormCreateLunch/>
            }
        ]
    }
])

export const AuthApp = () => {
    const [user, setUser] = useState({
        authenticated: false,
        email: '',
        role: '',
        idSchool:null
    });
    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await fetch("http://localhost:8080/", {
                    credentials: "include"
                });
                const data = await res.json();
                setUser({
                    authenticated:data.authenticated,
                    email:data.email,
                    role:data.role,
                    idSchool:data.idSchool
                })
                console.log(data);
                return data
            } catch (error: any) {
                console.log(error);
            }
        }
        loadData();
    }, []);
    return (
        < React.StrictMode >
            <AuthContext.Provider value={{ user, setUser }}>
                <RouterProvider router={router} />
            </AuthContext.Provider>
        </React.StrictMode >
    )
}