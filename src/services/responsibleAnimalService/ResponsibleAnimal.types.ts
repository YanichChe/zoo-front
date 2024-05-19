export type ResponsibleAnimalDto= {
    dateStart: string;
    dateEnd: string | null;

    _links: ResponsibleAnimalLinksDto;
}

export type EmbeddedDto = {
    _embedded: {
        "response-animal": ResponsibleAnimalDto[];
    }
}

export type ResponsibleAnimalLinksDto = {
    self: {
        href: string;
    }

    individual: {
        href: string;
    }

    staff: {
        href: string;
    }
}

export type ResponsibleAnimal = {
    dateStart: string;
    dateEnd: string | null;
    individual: string;
    staff: string;
    self: string;
}

export type ResponsibleAnimalInput = {
    dateStart: string;
    dateEnd: string | null;
    individual: string;
    staff: string;
}

export class ResponsibleAnimalId {
    dateStart: string;
    individual: string;
    staff: string;

    constructor(dateStart: string, individual: string, staff: string) {
        this.dateStart = dateStart;
        this.individual = individual;
        this.staff = staff;
    }
}
export class ResponsibleAnimalRequest {
    dateStart: string;
    dateEnd: string | null;
    individual: string;
    staff: string;
    id: ResponsibleAnimalId;

    constructor(dateStart: string, individual: string, staff: string, id: ResponsibleAnimalId, dateEnd: string | null = null ) {
        this.dateStart = dateStart;
        this.individual = individual;
        this.staff = staff;
        this.id = id;
        this.dateEnd = dateEnd;
    }
}
