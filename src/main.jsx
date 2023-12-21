import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from "@material-tailwind/react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './Components/Login.jsx';
import Register from './Components/Register.jsx';
import MainLayout from './Dashboard/MainLayout.jsx';
import Kanban from './Dashboard/Kanban.jsx';
import Authentication from './Auth/Authentication.jsx';
import Home from './Home.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path:'/',
        element: <Home/>
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path:'register',
        element:<Register/>
      },
    ]
  },
  {
    path:'/',
    element: <MainLayout/>,
    children:[
      {
        path:'dashboard',
        element: <Kanban/>
      }
    ]
  }

]);




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <Authentication>
      <RouterProvider router={router} /> 
      </Authentication>
    </ThemeProvider>
  </React.StrictMode>,
)
