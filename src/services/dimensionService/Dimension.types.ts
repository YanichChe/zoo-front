export type DimensionDto = {
    dimension: string;
    _links: DimensionLinksDto;
}

export type EmbeddedDto = {
    _embedded: {
        "dimensions": DimensionDto[];
    }
}

export type DimensionLinksDto = {
    self: {
        href: string;
    }
}

export type Dimension = {
    dimension: string;
    self: string
}
