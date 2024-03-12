export type GetAnimalListParameters = {
    isAlive?: boolean | null
    gender?:  number | null
    sorts?: string[] | null
    page?: number | null
    size?: number | null
}

export type GetAnimalListParametersCount = {
    isAlive?: boolean | null
    gender?:  number | null
    sorts?: string[] | null
}

export enum Gender {
    FEMALE = 'FEMALE',
    MALE = 'MALE',
}