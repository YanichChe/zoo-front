export type NeedOverpowerDto = {
    rowNum: string;
    name1: string;
    animalTitle1: string;
    name2: string;
    animalTitle2: string;
    cellNumber1: string;
    cellNumber2: string;
    _links: NeedOverpowerLinksDto;
}

export type EmbeddedDto = {
    _embedded: {
        "need-overpower": NeedOverpowerDto[];
    }
}

export type NeedOverpowerLinksDto = {
    self: {
        href: string;
    }
}

export type NeedOverpower = {
    rowNum: string;
    name1: string;
    animalTitle1: string;
    name2: string;
    animalTitle2: string;
    cellNumber1: string;
    cellNumber2: string;
}
