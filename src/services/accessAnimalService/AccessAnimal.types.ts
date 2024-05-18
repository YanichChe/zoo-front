export type AccessAnimalDto= {
    dateStart: string;
    dateEnd: string | null;

    _links: AccessAnimalLinksDto;
}

export type EmbeddedDto = {
    _embedded: {
        "access-animals": AccessAnimalDto[];
    }
}

export type AccessAnimalLinksDto = {
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

export type AccessAnimal = {
    dateStart: string;
    dateEnd: string | null;
    individual: string;
    staff: string;
    self: string;
}

export type AccessAnimalInput = {
    dateStart: string;
    dateEnd: string | null;
    individual: string;
    staff: string;
}

export class AccessAnimalId {
    dateStart: string;
    individual: string;
    staff: string;

    constructor(dateStart: string, individual: string, staff: string) {
        this.dateStart = dateStart;
        this.individual = individual;
        this.staff = staff;
    }
}
export class AccessAnimalRequest {
    dateStart: string;
    dateEnd: string | null;
    individual: string;
    staff: string;
    id: AccessAnimalId;

    constructor(dateStart: string, individual: string, staff: string, id: AccessAnimalId, dateEnd: string | null = null ) {
        this.dateStart = dateStart;
        this.individual = individual;
        this.staff = staff;
        this.id = id;
        this.dateEnd = dateEnd;
    }
}
