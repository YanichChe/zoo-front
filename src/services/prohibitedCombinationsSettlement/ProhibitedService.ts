import { AbstractService } from "../AbstractService";
import { ProhibitedCombinationsSettlement, ProhibitedCombinationsSettlementDto, EmbeddedDto, ProhibitedInput, ProhibitedRequest, ProhibitedId } from "./Prohibited.types";

export class ProhibitedCombinationsSettlementService extends AbstractService {

    public async getProhibited(url: string): Promise<ProhibitedCombinationsSettlement> {
        const result = await this.client.get(url);
        const animalId1: string = await this.getAnimalId(result.data._links.animalId1.href);
        const animalId2: string = await this.getAnimalId(result.data._links.animalId2.href);
        const self: string = result.data._links.self.href;
        return { animalId1, animalId2, self };
    }

    public async getList(): Promise<ProhibitedCombinationsSettlement[]> {
        const result = await this.client.get(`${this.baseUrl}/prohibited-combination`);
        const prohibitedCombinationsSettlementArray: ProhibitedCombinationsSettlement[] = await this.getProhibitedCombinationsSettlementArray(result.data);
        return prohibitedCombinationsSettlementArray;
    }

    private async getProhibitedCombinationsSettlementArray(embeddedDto: EmbeddedDto): Promise<ProhibitedCombinationsSettlement[]> {
        const { _embedded } = embeddedDto;
        if (!_embedded || !(_embedded['prohibited-combination'] instanceof Array)) {
            return [];
        }
    
        const prohibitedCombinationsSettlementDtos: ProhibitedCombinationsSettlementDto[] = _embedded['prohibited-combination'];
    
        const prohibitedCombinationsSettlementArray: Promise<ProhibitedCombinationsSettlement>[] = prohibitedCombinationsSettlementDtos.map(async (prohibitedCombinationsSettlementDto: ProhibitedCombinationsSettlementDto) => {
            const animalId1: string = await this.getAnimalId(prohibitedCombinationsSettlementDto._links.animalId1.href);
            const animalId2: string = await this.getAnimalId(prohibitedCombinationsSettlementDto._links.animalId2.href);
            const self: string = prohibitedCombinationsSettlementDto._links.self.href;
            console.log(animalId1, animalId2)
            return { animalId1, animalId2, self };
        });
    
        return Promise.all(prohibitedCombinationsSettlementArray);
    }

    public createProhibited = async (prohibited: ProhibitedInput): Promise<string> => {
        try {
            const request = this.createProhibitedRequest(prohibited);
            console.log(request.animalId1, request.animalId2, request.id)
            const response = await this.client.post(`${this.baseUrl}/prohibited-combination`, request);

            return response.data.dateEnd ? 'ok' : this.extractErrorMessage(response);
        } catch (error) {
            console.error('Произошла ошибка:', error);
            return this.extractErrorMessage(error);
        }
    }

    
    public update = async (prohibited: ProhibitedInput, url: string): Promise<string> => {
        try {
            const request = this.createProhibitedRequest(prohibited);
            const response = await this.client.put(url, request);

            const validationMessage = await this.validateResponseData(response.data, prohibited);
            return validationMessage || (response.data.dateEnd ? 'ok' : this.extractErrorMessage(response));
        } catch (error) {
            console.error('Произошла ошибка:', error);
            return this.extractErrorMessage(error);
        }
    }

    public async deleteProhibited(url: string): Promise<string> {
        const result = await this.client.delete(url);
        return result.data;
    }

    private async validateResponseData(responseData: ProhibitedCombinationsSettlementDto, prohibited: ProhibitedInput): Promise<string | null> {

        const animalId1 = await this.getAnimalId(responseData._links.animalId1.href);
        const animalId2 = await this.getAnimalId(responseData._links.animalId2.href);

        if (
            animalId1 !== await this.getAnimalId(prohibited.animalId1) ||
            animalId2 !== await this.getAnimalId(prohibited.animalId2)) {
            return 'Ошибка: данные не обновились';
        }
        return null;
    }

    private createProhibitedRequest(prohibited: ProhibitedInput): ProhibitedRequest {
        const id = new ProhibitedId(prohibited.animalId1, prohibited.animalId2);
        return new ProhibitedRequest(prohibited.animalId1, prohibited.animalId2, id);
    }

    private async getAnimalId(url: string): Promise<string> {
        const result = await this.client.get(`${url}`);
        return result.data.animalTitle as string;
    }

    private extractErrorMessage(response: any): string {
        // @ts-ignore
        const responseBody = response?.text ? response.text() : JSON.stringify(response);
        // @ts-ignore
        const jsonResponse = JSON.parse(responseBody);
        return jsonResponse.message || 'Произошла ошибка';
    }
}
