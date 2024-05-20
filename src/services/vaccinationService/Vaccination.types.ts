export type VaccinationDto = {
    vaccinationName: string;
    _links: VaccinationLinksDto;
}

export type EmbeddedDto = {
    _embedded: {
        "vaccinations": VaccinationDto[];
    }
}

export type VaccinationLinksDto = {
    self: {
        href: string;
    }
}

export type Vaccination = {
    vaccinationName: string;
    self: string;
}
