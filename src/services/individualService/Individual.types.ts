export type IndividualDto= {
    name: string;
    _links: IndividualLinksDto;
}

export type EmbeddedDto = {
    _embedded: {
        "individuals": IndividualDto[];
    }
}

export type IndividualLinksDto = {
    self: {
        href: string;
    }
}

export type Individual = {
    name: string;
    self: string;
}
