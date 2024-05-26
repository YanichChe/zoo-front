import { AbstractService } from "../AbstractService";
import { ResponsibleStaff, ResponsibleStaffDto, EmbeddedDto } from "./ResponsibleStaff.types";

export class ResponsibleStaffService extends AbstractService {
    public async getList(): Promise<ResponsibleStaff[]> {
        const result = await this.client.get(`${this.baseUrl}/responsible-animals`);
        const responsibleStaffArray: ResponsibleStaff[] = await this.getResponsibleStaffArray(result.data);
        return responsibleStaffArray;
    }

    private async getResponsibleStaffArray(embeddedDto: EmbeddedDto): Promise<ResponsibleStaff[]> {
        const { _embedded } = embeddedDto;
        if (!_embedded || !(_embedded['responsible-animals'] instanceof Array)) {
            return [];
        }

        const responsibleStaffDtos: ResponsibleStaffDto[] = _embedded['responsible-animals'];

        const responsibleStaffArray: Promise<ResponsibleStaff>[] = responsibleStaffDtos.map(async (responsibleStaffDto: ResponsibleStaffDto) => {
            return {
                rowNum: responsibleStaffDto.rowNum,
                staffId: responsibleStaffDto.staffId,
                staffName: responsibleStaffDto.staffName,
                staffSurname: responsibleStaffDto.staffSurname,
                middleName: responsibleStaffDto.middleName,
                individualId: responsibleStaffDto.individualId,
                individualName: responsibleStaffDto.individualName,
                animalId: responsibleStaffDto.animalId,
                dateStart: responsibleStaffDto.dateStart,
                dateEnd: responsibleStaffDto.dateEnd,
            };
        });

        return Promise.all(responsibleStaffArray);
    }
}
