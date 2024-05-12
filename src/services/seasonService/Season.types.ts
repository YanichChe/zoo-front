export type SeasonDto = {
    season: string;
}

export type EmbeddedDto = {
    _embedded: {
        "seasons": SeasonDto[];
    }
}

export type Season = {
    season: string;
}
