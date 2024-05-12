export type FoodDto = {
    foodName: string;
    _links: FoodLinksDto;
}

export type EmbeddedDto = {
    _embedded: {
        "foods": FoodDto[];
    }
}

export type FoodLinksDto = {
    self: {
        href: string;
    }

    feedType: {
        href: string;
    }

}

export type Food = {
    foodName: string;
    feedType: string;
}
