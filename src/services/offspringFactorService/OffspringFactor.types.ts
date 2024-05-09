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
}
