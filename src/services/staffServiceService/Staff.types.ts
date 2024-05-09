export type GetStaffListParameters = {
    gender?:  number | null
    sorts?: string[] | null
    page?: number | null
    size?: number | null
}

export type GetStaffListParametersCount = {
    gender?:  number | null
    sorts?: string[] | null
}

export enum Gender {
    FEMALE = 'FEMALE',
    MALE = 'MALE',
}