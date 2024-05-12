export type FoodProviderDto = {
    provider: string;
    _links: FoodProviderLinksDto;
}

export type EmbeddedDto = {
    _embedded: {
        "food-providers": FoodProviderDto[];
    }
}

export type FoodProviderLinksDto = {
    self: {
        href: string;
    }
}

export type FoodProvider = {
    provider: string;
}
