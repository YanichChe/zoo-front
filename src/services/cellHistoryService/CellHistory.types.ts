export type CellHistoryDto = {
    dateStart: string;
    dateEnd: string | null;
    cellNumber: number;
    _links: CellHistoryLinksDto;
}

export type EmbeddedDto = {
    _embedded: {
        "cell-history": CellHistoryDto[];
    }
}

export type CellHistoryLinksDto = {
    self: {
        href: string;
    }

    cellHistory: {
        href: string;
    }

    individual: {
        href: string;
    }
}

export type CellHistory = {
    dateStart: string;
    dateEnd: string | null;
    cellNumber: number;
    individualName: string;
    self: string
}

export type CellHistoryInput = {
    dateStart: string;
    dateEnd: string | null;
    individual: string;
    cellNumber: number;
}


export class CellHistoryRequest {
    dateStart: string;
    dateEnd: string | null;
    individual: string;
    cellNumber: number;

    constructor(dateStart: string, individual: string, cellNumber: number, dateEnd: string | null = null ) {
        this.dateStart = dateStart;
        this.individual = individual;
        this.cellNumber = cellNumber;
        this.dateEnd = dateEnd;
    }
}
