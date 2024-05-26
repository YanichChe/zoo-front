import { AbstractService } from "../AbstractService";
import { StaffAccess, StaffAccessDto, EmbeddedDto } from "./StaffAccess.types";

export class StaffAccessService extends AbstractService {
    public async getList(): Promise<StaffAccess[]> {
        const result = await this.client.get(`${this.baseUrl}/staff-access`);
        const staffAccessArray: StaffAccess[] = await this.getStaffAccessArray(result.data);
        return staffAccessArray;
    }

    private async getStaffAccessArray(embeddedDto: EmbeddedDto): Promise<StaffAccess[]> {
        const { _embedded } = embeddedDto;
        if (!_embedded || !(_embedded['staff-access'] instanceof Array)) {
            return [];
        }

        const staffAccessDtos: StaffAccessDto[] = _embedded['staff-access'];
    
        const staffAccessArray: Promise<StaffAccess>[] = staffAccessDtos.map(async (staffAccessDto: StaffAccessDto) => {
            return {
                rowNum: staffAccessDto.rowNum,
                staffId: staffAccessDto.staffId,
                staffName: staffAccessDto.staffName,
                staffSurname: staffAccessDto.staffSurname,
                middleName: staffAccessDto.middleName,
                individualId: staffAccessDto.individualId,
                individualName: staffAccessDto.individualName,
                animalId: staffAccessDto.animalId,
            };
        });

        return Promise.all(staffAccessArray);
    }
}
