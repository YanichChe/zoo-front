import { AbstractService } from "../AbstractService";
import { IndividualHistory, IndividualHistoryDto, EmbeddedDto, IndividualHistoryInput, IndividualHistoryRequest } from "./IndividualHistory.types";

export class IndividualHistoryService extends AbstractService {

    public async getIndividualHistory(url: string): Promise<IndividualHistory> {
        const result = await this.client.get(url);
        const { receiptDate } = result.data;
        const individual: string = await this.getIndividual(result.data._links.individual.href);
        const individualStatus: string = await this.getIndividualStatus(result.data._links.individualStatus.href);
        const zoo: string = await this.getZoo(result.data._links.zoo.href);
        return {
            receiptDate,
            individual,
            individualStatus,
            zoo,
            self: result.data._links.self.href
        };
    }

    public async getList(): Promise<IndividualHistory[]> {
        const result = await this.client.get(`${this.baseUrl}/individual-history`);
        const individualHistoryArray: IndividualHistory[] = await this.getIndividualHistoryArray(result.data);
        return individualHistoryArray;
    }

    private async getIndividual(url: string): Promise<string> {
        const result = await this.client.get(`${url}`);
        return result.data.name as string;
    }

    private async getIndividualStatus(url: string): Promise<string> {
        const result = await this.client.get(`${url}`);
        return result.data.statusName as string;
    }

    private async getZoo(url: string): Promise<string> {
        const result = await this.client.get(`${url}`);
        return result.data.name as string;
    }

    private async getIndividualHistoryArray(embeddedDto: EmbeddedDto): Promise<IndividualHistory[]> {
        const { _embedded } = embeddedDto;
        if (!_embedded || !(_embedded['individual-history'] instanceof Array)) {
            return [];
        }
    
        const individualHistoryDtos: IndividualHistoryDto[] = _embedded['individual-history'];
    
        const individualHistoryArray: Promise<IndividualHistory>[] = individualHistoryDtos.map(async (individualHistoryDto: IndividualHistoryDto) => {
            const { receiptDate } = individualHistoryDto;
            const individual: string = await this.getIndividual(individualHistoryDto._links.individual.href);
            const individualStatus: string = await this.getIndividualStatus(individualHistoryDto._links.individualStatus.href);
            const zoo: string = await this.getZoo(individualHistoryDto._links.zoo.href);
            return {
                receiptDate,
                individual,
                individualStatus,
                zoo,
                self: individualHistoryDto._links.self.href
            };
        });
    
        return Promise.all(individualHistoryArray);
    }

    public async deleteIndividualHistory(url: string): Promise<string> {
        const result = await this.client.delete(url);
        return result.data;
    }

    public createIndividualHistory = async (individualHistory: IndividualHistoryInput): Promise<string> => {
        console.log(individualHistory.zoo, individualHistory.individualStatus, individualHistory.individual);

        const dateValidationMessage = this.validateDate(individualHistory.receiptDate);
        if (dateValidationMessage) return dateValidationMessage;
       

        try {
            const request = this.createIndividualHistoryRequest(individualHistory);
            const response = await this.client.post(`${this.baseUrl}/individual-history`, request);

            return response.data.receiptDate!== undefined ? 'ok' : this.extractErrorMessage(response);
        } catch (error) {
            console.error('Произошла ошибка:', error);
            return this.extractErrorMessage(error);
        }
    }

    public update = async (IndividualHistory: IndividualHistoryInput, url: string): Promise<string> => {
        this.deleteIndividualHistory(url)
        const code = await this.createIndividualHistory(IndividualHistory);
        return code
    }

    private validateDate(date: string): string | null {
        const dateDate = new Date(date);
        const currentDate = new Date();
        if (dateDate > currentDate) return "Дата конца не может быть больше текущей даты";
        return null;
    }

    private createIndividualHistoryRequest(individualHistory: IndividualHistoryInput): IndividualHistoryRequest {
        return new IndividualHistoryRequest(individualHistory.receiptDate, individualHistory.individual, individualHistory.individualStatus, individualHistory.zoo);
    }

    private extractErrorMessage(response: any): string {
        // @ts-ignore
        const responseBody = response?.text ? response.text() : JSON.stringify(response);
        // @ts-ignore
        const jsonResponse = JSON.parse(responseBody);
        return jsonResponse.message || 'Произошла ошибка';
    }
}
