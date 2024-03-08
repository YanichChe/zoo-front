import { Role } from './UserContext'

export function getAllRoles(): Role[] {
    return [Role.USER, Role.ADMIN]
}