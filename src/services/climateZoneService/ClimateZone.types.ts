export type ClimateZoneDto = {
    isColdTolerance: boolean;
    climateZoneName: string;
    _links: ClimateZoneLinksDto;
}

export type EmbeddedDto = {
    _embedded: {
        "climate-zones": ClimateZoneDto[];
    }
}

export type ClimateZoneLinksDto = {
    self: {
        href: string;
    }
}

export type ClimateZone = {
    isColdTolerance: boolean;
    climateZoneName: string;
}