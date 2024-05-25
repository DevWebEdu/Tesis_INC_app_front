import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./views/Dashboard";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./views/Login";
import Indicencias from "./views/Indicencias";
import Users from "./views/Users";


const router = createBrowserRouter([
    {
        path: '/',
        element: <DashboardLayout/>,
        
        children: [{
            index:true , 
            element: <Dashboard/>
        },
        {
            path: '/incs',
            element: <Indicencias/>
        } ,
        {
            path: '/users',
            element: <Users/>
        }   
    ]
    },
    {
        path: '/auth',
        element : <AuthLayout/>,

        children : [{
            path: '/auth/login',
            element: <Login/>
        }]
    }
])


export default router;