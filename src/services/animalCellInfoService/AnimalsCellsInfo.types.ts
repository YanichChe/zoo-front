export type AnimalsCellsInfoDto = {
    rowNum: string;
    individualName: string;
    animalTitle: string;
    cellNumber: string;
    cellDateStart: string;
    cellDateEnd: string;
    gender: string;
    age: number;
    weight: number;
    height: number;
    _links: AnimalsCellsInfoLinksDto;
}

export type EmbeddedDto = {
    _embedded: {
        "animals-cells-info": AnimalsCellsInfoDto[];
    }
}

export type AnimalsCellsInfoLinksDto = {
    self: {
        href: string;
    }
}

export type AnimalsCellsInfo = {
    rowNum: string;
    individualName: string;
    animalTitle: string;
    cellNumber: string;
    cellDateStart: string;
    cellDateEnd: string;
    gender: string;
    age: number;
    weight: number;
    height: number;
}
