export type ZooDto = {
    name: string;
}

export type EmbeddedDto = {
    _embedded: {
        "zoos": ZooDto[];
    }
}

export type Zoo = {
    name: string;
}
