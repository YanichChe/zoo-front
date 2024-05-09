export type FamilyRelationshipDto = {
    individual_id_1: {
        href: string;
    };
    individual_id_2: {
        href: string;
    };
    _links: FamilyRelationshipLinksDto;
}

export type EmbeddedDto = {
    _embedded: {
        "family-relationships": FamilyRelationshipDto[];
    }
}

export type FamilyRelationshipLinksDto = {
    self: {
        href: string;
    }

    type_relationship: {
        href: string;
    }
}

export type FamilyRelationship = {
    individual1: string;
    individual2: string;
    typeRelationship: string;
}
