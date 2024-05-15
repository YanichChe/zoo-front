export type GetStaffListParameters = {
    gender?:  number | null
    sorts?: string[] | null
    page?: number | null
    size?: number | null
}

export type GetStaffListParametersCount = {
    gender?:  number | null
    sorts?: string[] | null
}

export enum Gender {
    FEMALE = 'FEMALE',
    MALE = 'MALE',
}

export type staffShortDto= {
    name: string;
    surname: string;
    middleName: string;
    _links: staffShortLinksDto;
}

export type EmbeddedDto = {
    _embedded: {
        "staff-list": staffShortDto[];
    }
}

export type staffShortLinksDto = {
    self: {
        href: string;
    }
}

export type staffShort = {
    name: string;
    surname: string;
    middleName: string;
    self: string;
}
