export type IndividualHistoryInfoDto = {
    rowNum: string;
    receiptDate: string;
    zooName: string;
    statusName: string;
    _links: IndividualHistoryInfoLinksDto;
}

export type EmbeddedDto = {
    _embedded: {
        "individual-history-info": IndividualHistoryInfoDto[];
    }
}

export type IndividualHistoryInfoLinksDto = {
    self: {
        href: string;
    }
}

export type IndividualHistoryInfo = {
    rowNum: string;
    receiptDate: string;
    zooName: string;
    statusName: string;
}
