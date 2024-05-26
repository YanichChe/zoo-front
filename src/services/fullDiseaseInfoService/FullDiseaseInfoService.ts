import { AbstractService } from "../AbstractService";
import { FullDiseaseInfo, FullDiseaseInfoDto, EmbeddedDto } from "./FullDiseaseInfo.types";

export class FullDiseaseInfoService extends AbstractService {
    public async getList(): Promise<FullDiseaseInfo[]> {
        const result = await this.client.get(`${this.baseUrl}/full-disease-info`);
        const fullDiseaseInfoArray: FullDiseaseInfo[] = await this.getFullDiseaseInfoArray(result.data);
        return fullDiseaseInfoArray;
    }

    private async getFullDiseaseInfoArray(embeddedDto: EmbeddedDto): Promise<FullDiseaseInfo[]> {
        const { _embedded } = embeddedDto;
        if (!_embedded || !(_embedded['full-disease-info'] instanceof Array)) {
            return [];
        }

        const fullDiseaseInfoDtos: FullDiseaseInfoDto[] = _embedded['full-disease-info'];

        return fullDiseaseInfoDtos.map((fullDiseaseInfoDto: FullDiseaseInfoDto) => {
            const {
                rowNum, name, animalTitle, height, weight,
                diseaseName, birthday, dateAppearance, dateDisappearance,
                age, cellNumber
            } = fullDiseaseInfoDto;
            return {
                rowNum, name, animalTitle, height, weight,
                diseaseName, birthday, dateAppearance, dateDisappearance,
                age, cellNumber
            };
        });
    }
}
