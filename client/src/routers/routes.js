import Home from "../pages/Home";
import Auth from "../pages/Auth";
import User from "../pages/User";

export const protectedRoutes=[
    {
        path:'/user',
        Component:User,
    }
]
export const publicRoutes = [
    {
        path: '/',
        Component: Home,
    },
    {
        path: '/login',
        Component:Auth,
    },
    {
        path: '/registration',
        Component:Auth,
    }
    ]