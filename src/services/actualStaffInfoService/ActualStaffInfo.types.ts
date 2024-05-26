export type ActualStaffInfoDto = {
    rowNum: string;
    name: string;
    surname: string;
    middleName: string;
    age: string;
    gender: string;
    dateStart: string;
    longWork: number;
    dateEnd: string;
    type: string;
    salary: number;
    _links: ActualStaffInfoLinksDto;
}

export type EmbeddedDto = {
    _embedded: {
        "actual-staff-info": ActualStaffInfoDto[];
    }
}

export type ActualStaffInfoLinksDto = {
    self: {
        href: string;
    }
}

export type ActualStaffInfo = {
    rowNum: string;
    name: string;
    surname: string;
    middleName: string;
    age: string;
    gender: string;
    dateStart: string;
    longWork: number;
    dateEnd: string;
    type: string;
    salary: number;
}
