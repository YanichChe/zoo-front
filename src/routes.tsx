import { Navigate } from 'react-router-dom'

import { Role } from './model/UserContext'
import { getAllRoles } from './model/UserContextHelper'
import Main from './pages/Main'
import StaffChoose from "./pages/StaffChoose";
import Animals from "./pages/Animals";
import Staffs from "./pages/Staffs";

export type RouteType = {
    accessRoles?: Role[]
    children?: RouteType[]
    element: JSX.Element
    index?: boolean
    isProtected: boolean
    path: string
}

export function getRoutes(): RouteType[] {
    return [
        {
            accessRoles: getAllRoles(),
            children: [],
            element: <Main />,
            isProtected: false,
            path: '/',
        },
        {
            accessRoles: getAllRoles(),
            children: [],
            element: <StaffChoose />,
            isProtected: false,
            path: '/login',
        },
        {
            accessRoles: getAllRoles(),
            children: [],
            element: <Animals />,
            isProtected: false,
            path: '/animals',
        },
        {
            accessRoles: getAllRoles(),
            children: [],
            element: <Staffs />,
            isProtected: false,
            path: '/staffs',
        },
        {
            element: <Navigate to="/" />,
            isProtected: false,
            path: '*',
        },
    ]
}