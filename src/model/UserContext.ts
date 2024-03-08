export type UserContext = {
    id: string
    role: Role
    username: string
}

export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER',
}