export type AnimalDto = {
    animalTitle: string;
    _links: AnimalLinksDto;
}

export type EmbeddedDto = {
    _embedded: {
        "general-animal": AnimalDto[];
    }
}

export type AnimalLinksDto = {
    self: {
        href: string;
    }

    climateZone: {
        href: string;
    }

    nutritionType: {
        href: string;
    }
}

export type Animal = {
    animalTitle: string;
    climateZone: string;
    nutritionType: string;
}