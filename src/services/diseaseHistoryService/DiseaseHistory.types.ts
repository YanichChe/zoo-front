export type DiseaseHistoryDto = {
    dateStart: string;
    dateEnd: string | null;
    cellNumber: number;
    _links: DiseaseHistoryLinksDto;
}

export type EmbeddedDto = {
    _embedded: {
        "disease-history": DiseaseHistoryDto[];
    }
}

export type DiseaseHistoryLinksDto = {
    self: {
        href: string;
    }

    disease: {
        href: string;
    }

    individual: {
        href: string;
    }
}

export type DiseaseHistory = {
    dateStart: string;
    dateEnd: string | null;
    disease: string;
    individualName: string;
}
