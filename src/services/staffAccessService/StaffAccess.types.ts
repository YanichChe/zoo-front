export type StaffAccessDto = {
    rowNum: number;
    staffId: number;
    staffName: string;
    staffSurname: string;
    middleName: string;
    individualId: number;
    individualName: string;
    animalId: number;
    _links: StaffAccessLinksDto;
}

export type EmbeddedDto = {
    _embedded: {
        "staff-access": StaffAccessDto[];
    }
}

export type StaffAccessLinksDto = {
    self: {
        href: string;
    }
}

export type StaffAccess = {
    rowNum: number;
    staffId: number;
    staffName: string;
    staffSurname: string;
    middleName: string;
    individualId: number;
    individualName: string;
    animalId: number;
}
