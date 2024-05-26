import { AbstractService } from "../AbstractService";
import { VaccinationData, VaccinationDataDto, EmbeddedDto } from "./VaccinationData.types";

export class VaccinationDataService extends AbstractService {
    public async getList(): Promise<VaccinationData[]> {
        const result = await this.client.get(`${this.baseUrl}/vaccination-data`);
        const vaccinationDataArray: VaccinationData[] = await this.getVaccinationDataArray(result.data);
        return vaccinationDataArray;
    }

    private async getVaccinationDataArray(embeddedDto: EmbeddedDto): Promise<VaccinationData[]> {
        const { _embedded } = embeddedDto;
        if (!_embedded || !(_embedded['vaccination-data'] instanceof Array)) {
            return [];
        }

        const vaccinationDataDtos: VaccinationDataDto[] = _embedded['vaccination-data'];
    
        const vaccinationDataArray: Promise<VaccinationData>[] = vaccinationDataDtos.map(async (vaccinationDataDto: VaccinationDataDto) => {
            return {
                rowNum: vaccinationDataDto.rowNum,
                individualName: vaccinationDataDto.individualName,
                animalTitle: vaccinationDataDto.animalTitle,
                gender: vaccinationDataDto.gender,
                age: vaccinationDataDto.age,
                vaccinationId: vaccinationDataDto.vaccinationId,
                vaccinationName: vaccinationDataDto.vaccinationName,
                dateAppearance: vaccinationDataDto.dateAppearance,
                dateDisappearance: vaccinationDataDto.dateDisappearance,
                childrenCount: vaccinationDataDto.childrenCount,
            };
        });

        return Promise.all(vaccinationDataArray);
    }
}
