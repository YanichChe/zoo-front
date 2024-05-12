export type VaccinationDto = {
    vaccinationName: string;
}

export type EmbeddedDto = {
    _embedded: {
        "vaccinations": VaccinationDto[];
    }
}

export type Vaccination = {
    vaccinationName: string;
}
