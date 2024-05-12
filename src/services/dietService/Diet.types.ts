export type DietDto = {
    count: number;
    time: string;
    _links: DietLinksDto;
}

export type EmbeddedDto = {
    _embedded: {
        "diet": DietDto[];
    }
}

export type DietLinksDto = {
    self: {
        href: string;
    }

    dietCharacteristics: {
        href: string;
    }

    food: {
        href: string;
    }

    dimension: {
        href: string;
    }
}

export type Diet = {
    count: number;
    time: string;
    dietCharacteristics: string;
    food: string;
    dimension: string;
}
