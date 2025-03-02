import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./views/Dashboard";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./views/Login";
import Indicencias from "./views/Indicencias";
import Users from "./views/Users";
import IncEdit from "./views/IncEdit";
import PrivateRouteAuth from "./private/PrivateRouteAuth";
import PrivateRouteAdmin from "./private/PrivateRouteAdmin";


const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <PrivateRouteAuth element={<DashboardLayout/>} />
        ),
        
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
            element:( <PrivateRouteAdmin element={<Users/>}/>)
        } ,
        {
            path : '/incs/:inc_id',
            element : <IncEdit/>
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