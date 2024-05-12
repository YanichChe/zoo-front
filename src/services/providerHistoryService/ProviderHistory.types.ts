export type ProviderHistoryDto = {
    date: string; // Assuming date is in ISO format
    number?: number; // Assuming number is optional
    price: string; // Assuming price is represented as a string
    _links: ProviderHistoryLinksDto;
}

export type EmbeddedDto = {
    _embedded: {
        "provider-history": ProviderHistoryDto[];
    }
}

export type ProviderHistoryLinksDto = {
    self: {
        href: string;
    }

    food: {
        href: string;
    }

    provider: {
        href: string;
    }

    dimension: {
        href: string;
    }
}

export type ProviderHistory = {
    date: string;
    number?: number;
    price: string;
    food: string;
    provider: string;
    dimension: string;
}
