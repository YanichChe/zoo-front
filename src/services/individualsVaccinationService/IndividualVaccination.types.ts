export type IndividualsVaccinationDto = {
    individualId: string;
    vaccinationId: string;
    staffId: string;
    _links: IndividualsVaccinationLinksDto;
}

export type EmbeddedDto = {
    _embedded: {
        "individuals-vaccination": IndividualsVaccinationDto[];
    }
}

export type IndividualsVaccinationLinksDto = {
    self: {
        href: string;
    }

    individual: {
        href: string;
    }

    vaccination: {
        href: string;
    }

    staff: {
        href: string;
    }
}

export type IndividualsVaccination = {
    individual: string;
    vaccination: string;
    staff: string;
}
