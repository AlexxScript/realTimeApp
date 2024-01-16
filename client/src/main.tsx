import React from 'react';
import { createRoot } from 'react-dom/client';
import * as ReactDom from "react-dom/client";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { App } from './App';
import { JoinRoom } from './pages/JoinRoom';
import { MakeOrders } from './pages/MakeOrders';
import { LoginUser } from './pages/LogInUser';
import { RegisterUser } from './pages/RegisterUser';

const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>
    },{
        path:'/home',
        element:<JoinRoom/>
    },{
        path:'/order',
        element:<MakeOrders/>
    },{
        path:"/login",
        element:<LoginUser/>
    },{
        path:"/register",
        element:<RegisterUser/>
    }
])

const root = createRoot(document.getElementById('app')!);

root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);