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
import AccessAnimalUpdatePage from './pages/accessAnimal/AccessAnimalUpdatePage';
import ResponsibleAnimalUpdatePage from './pages/responseAnimal/ResponseAnimalUpdatePage';
import CellHistoryUpdatePage from './pages/cellHistory/CellHistoryUpdatePage';
import CellHistoryCreatePage from './pages/cellHistory/CellHistoryCreatePage';
import ProhibitedCreatePage from './pages/prohibited/ProhibitedCreatePage';
import ProhibitedUpdatePage from './pages/prohibited/ProhibitedUpdatePage';
import DiseaseHistoryCreatePage from './pages/diseaseHistory/DiseaseCreatePage';
import DiseaseHistoryUpdatePage from './pages/diseaseHistory/DiseaseHistoryUpdatePage';

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
            element: <AccessAnimalUpdatePage />,
            isProtected: false,
            path: '/access-animal/update',
        },

        {
            accessRoles: getAllRoles(),
            children: [],
            element: <ResponseAnimalCreatePage />,
            isProtected: false,
            path: '/response-animal/create',
        },

        {
            accessRoles: getAllRoles(),
            children: [],
            element: <ResponsibleAnimalUpdatePage />,
            isProtected: false,
            path: '/response-animal/update',
        },
        
        {
            accessRoles: getAllRoles(),
            children: [],
            element: <CellHistoryCreatePage />,
            isProtected: false,
            path: '/cell-history/create',
        },

        {
            accessRoles: getAllRoles(),
            children: [],
            element: <CellHistoryUpdatePage />,
            isProtected: false,
            path: '/cell-history/update',
        },

        {
            accessRoles: getAllRoles(),
            children: [],
            element: <ProhibitedCreatePage />,
            isProtected: false,
            path: '/prohibited/create',
        },

        {
            accessRoles: getAllRoles(),
            children: [],
            element: <ProhibitedUpdatePage />,
            isProtected: false,
            path: '/prohibited/update',
        },

        {
            accessRoles: getAllRoles(),
            children: [],
            element: <DiseaseHistoryCreatePage />,
            isProtected: false,
            path: '/disease-history/create',
        },

        {
            accessRoles: getAllRoles(),
            children: [],
            element: <DiseaseHistoryUpdatePage />,
            isProtected: false,
            path: '/disease-history/update',
        },

        {
            element: <Navigate to="/" />,
            isProtected: false,
            path: '*',
        },
    ]
}
