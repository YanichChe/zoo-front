export type OffspringInfoDto = {
    rowNum: string;
    name: string;
    animalTitle: string;
    age: number;
    ageStart: number;
    ageEnd: number;
    state: string;
}

export type EmbeddedDto = {
    _embedded: {
        "offspring-info": OffspringInfoDto[];
    }
}

export type OffspringInfo = {
    rowNum: string;
    name: string;
    animalTitle: string;
    age: number;
    ageStart: number;
    ageEnd: number;
    state: string;
}
