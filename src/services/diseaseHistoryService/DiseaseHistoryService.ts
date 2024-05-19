import { AbstractService } from "../AbstractService";
import { Disease } from "../diseaseService/Disease.types";
import { DiseaseHistory, DiseaseHistoryDto, DiseaseHistoryInput, DiseaseHistoryRequest, EmbeddedDto } from "./DiseaseHistory.types";

export class DiseaseHistoryService extends AbstractService {

    public async getDiseaseHistory(url: string): Promise<DiseaseHistory> {
        const result = await this.client.get(url);
        const diseaseHistoryDto = result.data
        const { dateStart, dateEnd } = diseaseHistoryDto;
        const individualName: string = await this.getIndividual(diseaseHistoryDto._links.individual.href);
        const disease: string = await this.getDisease(diseaseHistoryDto._links.disease.href);
        const self = diseaseHistoryDto._links.self.href;

        return {
            dateStart,
            dateEnd,
            disease,
            individualName,
            self
        };

    }

    public async getList(): Promise<DiseaseHistory[]> {
        const result = await this.client.get(`${this.baseUrl}/disease-history`)
        const cellHistoryArray: DiseaseHistory[] = await this.getDiseaseHistoryArray(result.data);
        return cellHistoryArray
    }

    public async deleteDiseaseHistory(url: string): Promise<string> {
        const result = await this.client.delete(url);
        return result.data;
    }

    public createDiseaseHistory = async (diseaseHistory: DiseaseHistoryInput): Promise<string> => {
        console.log(diseaseHistory.individual, diseaseHistory.dateEnd, diseaseHistory.disease, diseaseHistory.dateStart);
        if (diseaseHistory.individual === '') return 'Не указано имя пациента';
        if (diseaseHistory.dateEnd !== null) {
            const dateValidationMessage = this.validateDates(diseaseHistory.dateStart, diseaseHistory.dateEnd);
            if (dateValidationMessage) return dateValidationMessage;
        }

        try {
            const request = this.createDiseaseHistoryRequest(diseaseHistory);
            const response = await this.client.post(`${this.baseUrl}/disease-history`, request);

            return response.data.dateEnd!== undefined ? 'ok' : this.extractErrorMessage(response);
        } catch (error) {
            console.error('Произошла ошибка:', error);
            return this.extractErrorMessage(error);
        }
    }

    public update = async (DiseaseHistory: DiseaseHistoryInput, url: string): Promise<string> => {
        this.deleteDiseaseHistory(url)
        const code = await this.createDiseaseHistory(DiseaseHistory);
        return code
    }

    private validateDates(dateStart: string, dateEnd: string): string | null {
        const startDate = new Date(dateStart);
        const endDate = new Date(dateEnd);
        const currentDate = new Date();

        if (startDate > endDate) return "Дата начала не может быть больше даты окончания";
        if (endDate > currentDate) return "Дата конца не может быть больше текущей даты";
        return null;
    }

    private createDiseaseHistoryRequest(diseaseHistory: DiseaseHistoryInput): DiseaseHistoryRequest {
        return new DiseaseHistoryRequest(diseaseHistory.dateStart, diseaseHistory.individual, 
            diseaseHistory.disease, diseaseHistory.dateEnd);
    }

    private extractErrorMessage(response: any): string {
        // @ts-ignore
        const responseBody = response?.text ? response.text() : JSON.stringify(response);
        // @ts-ignore
        const jsonResponse = JSON.parse(responseBody);
        return jsonResponse.message || 'Произошла ошибка';
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
            const self = diseaseHistoryDto._links.self.href;

            return {
                dateStart,
                dateEnd,
                disease,
                individualName,
                self
            };
        });
    
        return Promise.all(diseaseHistoryArray);
    }
}
