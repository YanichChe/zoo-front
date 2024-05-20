export type IndividualsVaccinationDto = {
    individualId: string;
    vaccinationId: string;
    staffId: string;
    _links: IndividualsVaccinationLinksDto;
}

export type EmbeddedDto = {
    _embedded: {
        "individual-vaccination": IndividualsVaccinationDto[];
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
    date: string;
    self: string;
}

export type IndividualsVaccinationInput = {
    individual: string;
    vaccination: string;
    date: string;
    staff: string;
}

export class IndividualsVaccinationId {
    date: string;
    individual: string;
    vaccination: string;

    constructor(date: string, individual: string, vaccination: string) {
        this.date = date;
        this.individual = individual;
        this.vaccination = vaccination;
    }
}
export class IndividualsVaccinationRequest {
    date: string;
    individual: string;
    vaccination: string;
    staff: string;
    id: IndividualsVaccinationId;

    constructor(date: string, individual: string, vaccination: string, staff: string, id: IndividualsVaccinationId) {
        this.date = date;
        this.individual = individual;
        this.vaccination = vaccination;
        this.staff = staff;
        this.id = id;
    }
}

