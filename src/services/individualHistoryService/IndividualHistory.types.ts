export type IndividualHistoryDto = {
    receiptDate: string;
    individualId: string;
    individualStatusId: string;
    zooId: string;
    _links: IndividualHistoryLinksDto;
}

export type EmbeddedDto = {
    _embedded: {
        "individual-history": IndividualHistoryDto[];
    }
}

export type IndividualHistoryLinksDto = {
    self: {
        href: string;
    }

    individual: {
        href: string;
    }

    individualStatus: {
        href: string;
    }

    zoo: {
        href: string;
    }
}

export type IndividualHistory = {
    receiptDate: string;
    individual: string;
    individualStatus: string;
    zoo: string;
}
