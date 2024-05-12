export type DiseaseDto = {
    diseaseName: string;
    _links: DiseaseLinksDto;
}

export type EmbeddedDto = {
    _embedded: {
        "diseases": DiseaseDto[];
    }
}

export type DiseaseLinksDto = {
    self: {
        href: string;
    }
}

export type Disease = {
    diseaseName: string;
}
