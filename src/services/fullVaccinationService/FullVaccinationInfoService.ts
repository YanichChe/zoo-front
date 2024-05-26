import { AbstractService } from "../AbstractService";
import { FullVaccinationInfo, FullVaccinationInfoDto, EmbeddedDto } from "./FullVaccinationInfo.types";

export class FullVaccinationInfoService extends AbstractService {
    public async getList(): Promise<FullVaccinationInfo[]> {
        const result = await this.client.get(`${this.baseUrl}/full-vaccination-info`);
        const fullVaccinationInfoArray: FullVaccinationInfo[] = await this.getFullVaccinationInfoArray(result.data);
        return fullVaccinationInfoArray;
    }

    private async getFullVaccinationInfoArray(embeddedDto: EmbeddedDto): Promise<FullVaccinationInfo[]> {
        const { _embedded } = embeddedDto;
        if (!_embedded || !(_embedded['full-vaccination-info'] instanceof Array)) {
            return [];
        }

        const fullVaccinationInfoDtos: FullVaccinationInfoDto[] = _embedded['full-vaccination-info'];

        return fullVaccinationInfoDtos.map((fullVaccinationInfoDto: FullVaccinationInfoDto) => {
            const {
                rowNum, name, animalTitle, height, weight,
                vaccinationName, birthday, dateAppearance, dateDisappearance,
                age, cellNumber
            } = fullVaccinationInfoDto;
            return {
                rowNum, name, animalTitle, height, weight,
                vaccinationName, birthday, dateAppearance, dateDisappearance,
                age, cellNumber
            };
        });
    }
}
