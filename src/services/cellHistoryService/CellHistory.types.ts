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
}