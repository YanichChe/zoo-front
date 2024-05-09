import { AbstractService } from "../AbstractService";
import { DiseaseHistory, DiseaseHistoryDto, EmbeddedDto } from "./DiseaseHistory.types";

export class DiseaseHistoryService extends AbstractService {
    public async getList(): Promise<DiseaseHistory[]> {
        const result = await this.client.get(`${this.baseUrl}/disease-history`)
        const cellHistoryArray: DiseaseHistory[] = await this.getDiseaseHistoryArray(result.data);
        return cellHistoryArray
    }

    private async getIndividual(url: string): Promise<string> {
        const result = await this.client.get(`${url}`)
        return result.data.name as string
    }

    private async getDisease(url: string): Promise<string> {
        const result = await this.client.get(`${url}`)
        return result.data.diseaseName as string
    }

    private async getDiseaseHistoryArray(embeddedDto: EmbeddedDto): Promise<DiseaseHistory[]> {
        const { _embedded } = embeddedDto;
        if (!_embedded || !(_embedded['disease-history'] instanceof Array)) {
            return [];
        }
    
        const diseaseHistoryDtos: DiseaseHistoryDto[] = _embedded['disease-history'];
    
        const diseaseHistoryArray: Promise<DiseaseHistory>[] = diseaseHistoryDtos.map(async (diseaseHistoryDto: DiseaseHistoryDto) => {
            const { dateStart, dateEnd } = diseaseHistoryDto;
            const individualName: string = await this.getIndividual(diseaseHistoryDto._links.individual.href);
            const disease: string = await this.getDisease(diseaseHistoryDto._links.disease.href);
            return {
                dateStart,
                dateEnd,
                disease,
                individualName
            };
        });
    
        return Promise.all(diseaseHistoryArray);
    }
}
