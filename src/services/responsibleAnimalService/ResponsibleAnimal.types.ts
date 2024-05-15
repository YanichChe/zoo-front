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
}
