export type TypeRelationshipDto = {
    relationship: string;
    _links: TypeRelationshipsLinksDto;
}

export type EmbeddedDto = {
    _embedded: {
        "type-relationships": TypeRelationshipDto[];
    }
}

export type TypeRelationship = {
    relationship: string;
    self: string;
}

export type TypeRelationshipsLinksDto = {
    self: {
        href: string;
    }
}
