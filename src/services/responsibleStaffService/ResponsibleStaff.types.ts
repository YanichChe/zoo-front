export type ResponsibleStaffDto = {
    rowNum: string;
    staffId: string;
    staffName: string;
    staffSurname: string;
    middleName: string;
    individualId: string;
    individualName: string;
    animalId: string;
    dateStart: string;
    dateEnd: string;
}

export type EmbeddedDto = {
    _embedded: {
        "responsible-animals": ResponsibleStaffDto[];
    }
}

export type ResponsibleStaff = {
    rowNum: string;
    staffId: string;
    staffName: string;
    staffSurname: string;
    middleName: string;
    individualId: string;
    individualName: string;
    animalId: string;
    dateStart: string;
    dateEnd: string;
}
