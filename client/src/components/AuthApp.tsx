import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { App } from '../App';
import { LoginUser } from '../pages/LogInUser';
import { RegisterUser } from '../pages/RegisterUser';
import { RegisterSchool } from '../pages/RegisterSchool';
import { AuthContext } from '../context/AuthContext';
import { Dashboard } from '../pages/AdminManage';
import { ManageOrders } from '../pages/ManageOrders';
import { ManageLunch } from '../pages/ManageLunch';
import { MenuList } from '../pages/MenuList';
import { ShoppingCartProvider } from '../context/ShoppingCartContext';
import { Profile } from '../pages/Profile';
import { UpdateLunch } from '../pages/UpdateLunch';

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
    }, {
        path: '/menu',
        element: <MenuList />
    }, {
        path: "/admin",
        element: <Dashboard />,
        children: [
            {
                path: '/admin',
                element: <ManageOrders />
            }, {
                path: '/admin/manage',
                element: <ManageLunch />
            }, {
                path: '/admin/manage/:lunchId',
                element: <UpdateLunch/>
            }
        ]
    }, {
        path:'/profile',
        element: <Profile/>
    }
])

export const AuthApp = () => {
    const [user, setUser] = useState({
        authenticated: false,
        email: '',
        role: '',
        idSchool: null,
        idUser: ''
    });
    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await fetch("http://localhost:8080/", {
                    credentials: "include"
                });
                const data = await res.json();
                setUser({
                    authenticated: data.authenticated,
                    email: data.email,
                    role: data.role,
                    idSchool: data.idSchool,
                    idUser: data.idUser
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
                <ShoppingCartProvider>
                    <RouterProvider router={router} />
                </ShoppingCartProvider>
            </AuthContext.Provider>
        </React.StrictMode >
    )
}