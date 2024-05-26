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
    dietCharacteristics: number;
    food: string;
    dimension: string;
    self: string;
}

export type DietInput = {
    count: number;
    time: string;
    dietCharacteristics: number;
    food: string;
    dimension: string;
}

export class DietRequest {
    count: number;
    time: string;
    dietCharacteristics: number;
    food: string;
    dimension: string;
    
    constructor(count: number, time: string, dietCharacteristics: number, food: string, dimension: string) {
        this.count = count;
        this.time = time;
        this.dietCharacteristics = dietCharacteristics;
        this.food = food;
        this.dimension = dimension;
    }
}
