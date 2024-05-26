import { AbstractService } from "../AbstractService";
import { ActualStaffInfo, ActualStaffInfoDto, EmbeddedDto } from "./ActualStaffInfo.types";

export class ActualStaffInfoService extends AbstractService {
    public async getList(): Promise<ActualStaffInfo[]> {
        const result = await this.client.get(`${this.baseUrl}/actual-staff-info`);
        const actualStaffInfoArray: ActualStaffInfo[] = await this.getActualStaffInfoArray(result.data);
        return actualStaffInfoArray;
    }

    private async getActualStaffInfoArray(embeddedDto: EmbeddedDto): Promise<ActualStaffInfo[]> {
        const { _embedded } = embeddedDto;
        if (!_embedded || !(_embedded['actual-staff-info'] instanceof Array)) {
            return [];
        }

        const actualStaffInfoDtos: ActualStaffInfoDto[] = _embedded['actual-staff-info'];

        return actualStaffInfoDtos.map((actualStaffInfoDto: ActualStaffInfoDto) => {
            const { rowNum, name, surname, middleName, age, gender, dateStart, longWork, dateEnd, type, salary } = actualStaffInfoDto;

            return {
                rowNum,
                name,
                surname,
                middleName,
                age,
                gender,
                dateStart,
                longWork,
                dateEnd,
                type,
                salary
            };
        });
    }
}
