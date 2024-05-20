export type DietCharacteristicDto = {
    age: number;
    _links: DietCharacteristicLinksDto;
}

export type EmbeddedDto = {
    _embedded: {
        "diet-characteristics": DietCharacteristicDto[];
    }
}

export type DietCharacteristicLinksDto = {
    self: {
        href: string;
    }

    physicalState: {
        href: string;
    }

    season: {
        href: string;
    }

    animal: {
        href: string;
    }
}

export type DietCharacteristic = {
    age: number;
    physicalState: string;
    season: string;
    animal: string;
    self: string;
}

export type DietCharacteristicInput = {
    age: number;
    physicalState: string;
    season: string;
    animal: string;
}

export class DietCharacteristicRequest {
    age: number;
    physicalState: string;
    season: string;
    animal: string;
    
    constructor(age: number, physicalState: string, season: string, animal: string) {
        this.age = age;
        this.physicalState = physicalState;
        this.season = season;
        this.animal = animal;
    }
}

