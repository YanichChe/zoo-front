export type IndividualReceiptStatusDto = {
    statusName: string;
    _links: IndividualReceiptStatusLinksDto;
}

export type EmbeddedDto = {
    _embedded: {
        "individual-receipt-status": IndividualReceiptStatusDto[];
    }
}

export type IndividualReceiptStatusLinksDto = {
    self: {
        href: string;
    }
}

export type IndividualReceiptStatus = {
    statusName: string;
}
