export type SeasonDto = {
    season: string;
    _links: SeasonLinksDto;
}

export type EmbeddedDto = {
    _embedded: {
        "seasons": SeasonDto[];
    }
}

export type Season = {
    season: string;
    self: string;
}

export type  SeasonLinksDto = {
    self: {
        href: string;
    }
}