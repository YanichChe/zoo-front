export type PhysicalStateDto = {
    state: string;
    _links: PhysicalStateLinksDto;
}

export type EmbeddedDto = {
    _embedded: {
        "physical-state": PhysicalStateDto[];
    }
}

export type PhysicalState = {
    state: string;
    self: string;
}

export type PhysicalStateLinksDto = {
    self: {
        href: string;
    }
}
