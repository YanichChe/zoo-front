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

export type AnimalSimpeDto= {
    animalTitle: string
    _links: AnimalLinksDto;
}

export type EmbeddedDto = {
    _embedded: {
        "general-animal": AnimalSimpeDto[];
    }
}

export type AnimalLinksDto = {
    self: {
        href: string;
    }
}

export type Animal = {
    animalTitle: string;
    self: string;
}