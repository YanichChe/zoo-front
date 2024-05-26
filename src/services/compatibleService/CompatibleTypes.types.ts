export type CompatibleTypesDto = {
    rowNum: string;
    aanimalTitle: string;
    banimalTitle: string;
    _links: CompatibleTypesLinksDto;
}

export type EmbeddedDto = {
    _embedded: {
        "compatible-type": CompatibleTypesDto[];
    }
}

export type CompatibleTypesLinksDto = {
    self: {
        href: string;
    }
}

export type CompatibleTypes = {
    rowNum: string;
    aanimalTitle: string;
    banimalTitle: string;
}
