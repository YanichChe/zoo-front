import { AbstractService } from "../AbstractService";
import { Disease, DiseaseDto, EmbeddedDto } from "./Disease.types";

export class DiseaseService extends AbstractService {
    public async getList(): Promise<Disease[]> {
        const result = await this.client.get(`${this.baseUrl}/diseases`);
        const diseaseArray: Disease[] = await this.getDiseaseArray(result.data);
        return diseaseArray;
    }

    private async getDiseaseArray(embeddedDto: EmbeddedDto): Promise<Disease[]> {
        const { _embedded } = embeddedDto;
        if (!_embedded || !(_embedded['diseases'] instanceof Array)) {
            return [];
        }
    
        const diseaseDtos: DiseaseDto[] = _embedded['diseases'];
    
        const diseaseArray: Disease[] = diseaseDtos.map((diseaseDto: DiseaseDto) => {
            const self = diseaseDto._links.self.href;
            return {
                diseaseName: diseaseDto.diseaseName,
                self
            };
        });
    
        return diseaseArray;
    }
}
