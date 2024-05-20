export type FamilyRelationshipsDto= {
    _links: FamilyRelationshipsLinksDto;
}

export type EmbeddedDto = {
    _embedded: {
        "family-relationships": FamilyRelationshipsDto[];
    }
}

export type FamilyRelationshipsLinksDto = {
    self: {
        href: string;
    }

    individualId1: {
        href: string;
    }

    individualId2: {
        href: string;
    }

    typeRelationship: {
        href: string;
    }
}

export type FamilyRelationships = {
    individualId1: string
    individualId2: string
    typeRelationship: string;
    self: string;
}

export type FamilyRelationshipsInput = {
    individualId1: string
    individualId2: string
    typeRelationship: string;
}

export class FamilyRelationshipsRequest {
    individualId1: string
    individualId2: string
    typeRelationship: string;

    constructor(individualId1: string, individualId2: string, typeRelationship: string) {
        this.individualId1 = individualId1;
        this.individualId2 = individualId2;
        this.typeRelationship = typeRelationship;
    }
}
