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

export type ResponseAnimal = {
    dateStart: string;
    dateEnd: string | null;
    individual: string;
    staff: string;
    self: string;
}

export type ResponseAnimalInput = {
    dateStart: string;
    dateEnd: string | null;
    individual: string;
    staff: string;
}

export class ResponseAnimalId {
    dateStart: string;
    individual: string;
    staff: string;

    constructor(dateStart: string, individual: string, staff: string) {
        this.dateStart = dateStart;
        this.individual = individual;
        this.staff = staff;
    }
}
export class ResponseAnimalRequest {
    dateStart: string;
    individual: string;
    staff: string;
    id: ResponseAnimalId;

    constructor(dateStart: string, individual: string, staff: string, id: ResponseAnimalId) {
        this.dateStart = dateStart;
        this.individual = individual;
        this.staff = staff;
        this.id = id;
    }
}