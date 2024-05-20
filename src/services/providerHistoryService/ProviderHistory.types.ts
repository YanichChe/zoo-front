export type ProviderHistoryDto = {
    date: string;
    number: number; 
    price: number;
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
    number: number;
    price: number;
    food: string;
    provider: string;
    dimension: string;
    self: string
}

export type ProviderHistoryInput = {
    date: string;
    number: number;
    price: number;
    food: string;
    provider: string;
    dimension: string;
    self: string
}

export class ProviderHistoryRequest {
    date: string;
    number: number;
    price: number;
    food: string;
    provider: string;
    dimension: string;

    constructor(date: string, price: number, food: string, provider: string, dimension: string, number: number) {
        this.date = date;
        this.number = number;
        this.price = price;
        this.food = food;
        this.provider = provider;
        this.dimension = dimension;
    }
}