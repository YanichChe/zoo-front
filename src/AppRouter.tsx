import { useEffect } from 'react'
import { useNavigate, useRoutes } from 'react-router-dom'

import { RouteType, getRoutes } from './routes'

// @ts-ignore
function PrivateRoute({ accessRoles, children }) {
    const navigate = useNavigate()
    const userRole = undefined

    useEffect(() => {
        if (userRole === undefined || accessRoles === undefined || !accessRoles.includes(userRole)) {
            navigate('/forbidden')
        }
    }, [userRole, accessRoles, navigate])

    if (userRole === undefined || accessRoles === undefined || !accessRoles.includes(userRole)) {
        return null
    }

    return children
}

// @ts-ignore
function createRoutes(routes: RouteType[]) {
    return routes.map((route: RouteType) => {
        return {
            children: route.children ? createRoutes(route.children) : undefined,
            element: route.isProtected ? <PrivateRoute accessRoles={route.accessRoles}>{route.element}</PrivateRoute> : route.element,
            index: route.index || false,
            path: route.path,
        }
    })
}

export function Router() {
    const routes = getRoutes()
    return useRoutes(createRoutes(routes))
}