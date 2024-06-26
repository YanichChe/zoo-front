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
    self: string
}

export type DiseaseHistoryInput = {
    dateStart: string;
    dateEnd: string | null;
    disease: string;
    individual: string;
}

export class DiseaseHistoryRequest {
    dateStart: string;
    dateEnd: string | null;
    individual: string;
    disease: string;

    constructor(dateStart: string, individual: string, disease: string, dateEnd: string | null = null ) {
        this.dateStart = dateStart;
        this.individual = individual;
        this.disease = disease;
        this.dateEnd = dateEnd;
    }
}