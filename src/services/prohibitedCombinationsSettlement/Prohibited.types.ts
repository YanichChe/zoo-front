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
}
