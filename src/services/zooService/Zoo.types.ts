export type ZooDto = {
    name: string;
    _links: ZooLinksDto;
}

export type EmbeddedDto = {
    _embedded: {
        "zoos": ZooDto[];
    }
}

export type  ZooLinksDto = {
    self: {
        href: string;
    }
}

export type Zoo = {
    name: string;
    self: string
}
