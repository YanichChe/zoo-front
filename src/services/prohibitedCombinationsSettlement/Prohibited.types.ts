export type ProhibitedCombinationsSettlementDto = {
    _links: ProhibitedCombinationsSettlementLinksDto;
}

export type EmbeddedDto = {
    _embedded: {
        "prohibited-combination": ProhibitedCombinationsSettlementDto[];
    }
}

export type ProhibitedCombinationsSettlementLinksDto = {
    self: {
        href: string;
    }

    animalId1: {
        href: string;
    }

    animalId2: {
        href: string;
    }
}

export type ProhibitedCombinationsSettlement = {
    animalId1: string;
    animalId2: string;
    self: string
}

export type ProhibitedInput = {
    animalId1: string;
    animalId2: string;
}

export class ProhibitedId {
    animalId1: string;
    animalId2: string;

    constructor(animalId1: string, animalId2: string) {
        this.animalId1 = animalId1;
        this.animalId2 = animalId2;
    }
}
export class ProhibitedRequest {
    animalId1: string;
    animalId2: string;
    id: ProhibitedId;

    constructor(animalId1: string, animalId2: string, id: ProhibitedId) {
        this.animalId1 = animalId1;
        this.animalId2 = animalId2;
        this.id = id;
    }
}
