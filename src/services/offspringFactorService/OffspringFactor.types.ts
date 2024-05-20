export type OffspringFactorDto = {
    animalId: string;
    physicalStateId: string;
    ageStart: number;
    ageEnd: number;
    _links: OffspringFactorLinksDto;
}

export type EmbeddedDto = {
    _embedded: {
        "offspring-factors": OffspringFactorDto[];
    }
}

export type OffspringFactorLinksDto = {
    self: {
        href: string;
    }

    animal: {
        href: string;
    }

    physicalState: {
        href: string;
    }
}

export type OffspringFactor = {
    animal: string;
    physicalState: string;
    ageStart: number;
    ageEnd: number;
    self: string
}

export type OffspringFactorInput = {
    animal: string;
    physicalState: string;
    ageStart: number;
    ageEnd: number;

}

export class OffspringFactorRequest {
    animal: string;
    physicalState: string;
    ageStart: number;
    ageEnd: number;

    constructor(animal: string, physicalState: string, ageStart: number, ageEnd: number) {
        this.animal = animal;
        this.physicalState = physicalState;
        this.ageStart = ageStart;
        this.ageEnd = ageEnd;
    }
}
