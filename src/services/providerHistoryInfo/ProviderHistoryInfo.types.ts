export type ProviderHistoryInfoDto = {
    rowNum: string;
    date: string;
    provider: string;
    foodName: string;
    feedType: string;
    number: number;
    dimension: string;
    price: number;
}

export type EmbeddedDto = {
    _embedded: {
        "provider-history-info": ProviderHistoryInfoDto[];
    }
}

export type ProviderHistoryInfo = {
    rowNum: string;
    date: string;
    provider: string;
    foodName: string;
    feedType: string;
    number: number;
    dimension: string;
    price: number;
}
