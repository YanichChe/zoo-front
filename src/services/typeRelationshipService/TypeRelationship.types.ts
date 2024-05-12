export type TypeRelationshipDto = {
    relationship: string;
}

export type EmbeddedDto = {
    _embedded: {
        "type-relationships": TypeRelationshipDto[];
    }
}

export type TypeRelationship = {
    relationship: string;
}
