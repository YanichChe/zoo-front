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
}
