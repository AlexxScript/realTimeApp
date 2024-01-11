import React from 'react';
import { createRoot } from 'react-dom/client';
import * as ReactDom from "react-dom/client";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { App } from './App';
import { Home } from './pages/Home';

const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>
    },{
        path:'/home',
        element:<Home/>
    }
])

const root = createRoot(document.getElementById('app')!);

root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);