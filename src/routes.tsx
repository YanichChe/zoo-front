import { Navigate } from 'react-router-dom'

import { Role } from './model/UserContext'
import { getAllRoles } from './model/UserContextHelper'
import Main from './pages/Main'
import StaffChoose from "./pages/StaffChoose";
import Animals from "./pages/Animals";
import Staffs from "./pages/Staffs";
import AnimalCreatePage from "./pages/AnimalCreatePage";
import AnimalUpdatePage from "./pages/AnimalUpdatePage";
import StaffCreatePage from "./pages/StaffCreatePage";
import StaffUpdatePage from "./pages/StaffUpdatePage";
import Tables from './pages/Tables';
import AccessAnimalCreatePage from './pages/accessAnimal/AccessAnimalCreatePage';
import ResponseAnimalCreatePage from './pages/responseAnimal/ResponseAnimalCreatePage';

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
            accessRoles: getAllRoles(),
            children: [],
            element: <Tables />,
            isProtected: false,
            path: '/tables',
        },
    
        {
            accessRoles: getAllRoles(),
            children: [],
            element: <AnimalCreatePage />,
            isProtected: false,
            path: '/animals/create',
        },
        {
            accessRoles: getAllRoles(),
            children: [],
            element: <StaffCreatePage />,
            isProtected: false,
            path: '/staffs/create',
        },
        {
            accessRoles: getAllRoles(),
            children: [],
            element: <StaffUpdatePage />,
            isProtected: false,
            path: '/staffs/update',
        },

        {
            accessRoles: getAllRoles(),
            children: [],
            element: <AnimalUpdatePage />,
            isProtected: false,
            path: '/animals/update',
        },

        {
            accessRoles: getAllRoles(),
            children: [],
            element: <AccessAnimalCreatePage />,
            isProtected: false,
            path: '/access-animal/create',
        },

        {
            accessRoles: getAllRoles(),
            children: [],
            element: <ResponseAnimalCreatePage />,
            isProtected: false,
            path: '/response-animal/create',
        },

        {
            element: <Navigate to="/" />,
            isProtected: false,
            path: '*',
        },
    ]
}
