import { AbstractService } from "../AbstractService";
import { DiseaseData, DiseaseDataDto, EmbeddedDto } from "./DiseaseData.types";

export class DiseaseDataService extends AbstractService {
    public async getList(): Promise<DiseaseData[]> {
        const result = await this.client.get(`${this.baseUrl}/disease-data`);
        console.log(result.data)
        const diseaseDataArray: DiseaseData[] = await this.getDiseaseDataArray(result.data);
        return diseaseDataArray;
    }

    private async getDiseaseDataArray(embeddedDto: EmbeddedDto): Promise<DiseaseData[]> {
        const { _embedded } = embeddedDto;
        if (!_embedded || !(_embedded['disease-data'] instanceof Array)) {
            return [];
        }

        const diseaseDataDtos: DiseaseDataDto[] = _embedded['disease-data'];

        return diseaseDataDtos.map((diseaseDataDto: DiseaseDataDto) => {
            const {
                rowNum, individualName, animalTitle, gender, age,
                diseaseName, dateAppearance, dateDisappearance,
                diseaseHistoryDateStart, diseaseHistoryDateEnd, childrenCount
            } = diseaseDataDto;
            return {
                rowNum, individualName, animalTitle, gender, age,
                diseaseName, dateAppearance, dateDisappearance,
                diseaseHistoryDateStart, diseaseHistoryDateEnd, childrenCount
            };
        });
    }
}
