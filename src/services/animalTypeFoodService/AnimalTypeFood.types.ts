export type AnimalTypeFoodDto = {
    animalTitle: string;
    foodName: string;
    feedType: string;
    age: number;
    _links: AnimalTypeFoodLinksDto;
}

export type EmbeddedDto = {
    _embedded: {
        "animal-type-food": AnimalTypeFoodDto[];
    }
}

export type AnimalTypeFoodLinksDto = {
    self: {
        href: string;
    }
}

export type AnimalTypeFood = {
    animalTitle: string;
    foodName: string;
    feedType: string;
    age: number;
}
