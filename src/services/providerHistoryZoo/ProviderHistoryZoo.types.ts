export type ProviderHistoryZooDto = {
    date: string;
    provider: string;
    foodName: string;
    feedType: string;
    number: number;
    dimension: string;
    price: number;
    selfSufficiency: boolean;
    _links: ProviderHistoryZooLinksDto;
}

export type EmbeddedDto = {
    _embedded: {
        "provider-history-zoo": ProviderHistoryZooDto[];
    }
}

export type ProviderHistoryZooLinksDto = {
    self: {
        href: string;
    }
}

export type ProviderHistoryZoo = {
    date: string;
    provider: string;
    foodName: string;
    feedType: string;
    number: number;
    dimension: string;
    price: number;
    selfSufficiency: boolean;
}
