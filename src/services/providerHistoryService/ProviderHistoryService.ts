import { AbstractService } from "../AbstractService";
import { ProviderHistory, ProviderHistoryDto, EmbeddedDto, ProviderHistoryInput, ProviderHistoryRequest } from "./ProviderHistory.types";

export class ProviderHistoryService extends AbstractService {

    public async getProviderHistory(url: string): Promise<ProviderHistory> {
        const result = await this.client.get(url);
        const { date, number, price } = result.data;
        const provider = await this.getProvider(result.data._links.provider.href);
        const food = await this.getFood(result.data._links.food.href);
        const dimension = await this.getDimension(result.data._links.dimension.href);
        const date_ = new Date(date);
        const formattedDate = date_.toISOString().split('T')[0];

    

        return {
            date: formattedDate, number, price, provider, food, dimension,
            self: result.data._links.self.href,
        };
    }

    public async getList(): Promise<ProviderHistory[]> {
        const result = await this.client.get(`${this.baseUrl}/provider-history`)
        const cellHistoryArray: ProviderHistory[] = await this.getproviderArray(result.data);
        return cellHistoryArray
    }

    private async getproviderArray(embeddedDto: EmbeddedDto): Promise<ProviderHistory[]> {

        const { _embedded } = embeddedDto;
        if (!_embedded || !(_embedded['provider-history'] instanceof Array)) {
            return [];
        }

        const providerDtos: ProviderHistoryDto[] = _embedded['provider-history'];
    
        const providerArray: Promise<ProviderHistory>[] = providerDtos.map(async (dietCharacteristicDto: ProviderHistoryDto) => {

            const { date, number, price } = dietCharacteristicDto;
            const provider = await this.getProvider(dietCharacteristicDto._links.provider.href);
            const food = await this.getFood(dietCharacteristicDto._links.food.href);
            const dimension = await this.getDimension(dietCharacteristicDto._links.dimension.href);
            const date_ = new Date(date);
            const formattedDate = date_.toISOString().split('T')[0];

            return {
                date: formattedDate, 
                number, 
                price, 
                provider, 
                food, 
                dimension,
                self: dietCharacteristicDto._links.self.href,
            };
        });

        return Promise.all(providerArray);
    }

    private async getProvider(url: string): Promise<string> {
        const result = await this.client.get(`${url}`);
        return result.data.provider as string
    }

    private async getFood(url: string): Promise<string> {
        const result = await this.client.get(`${url}`);
        return result.data.foodName as string
    }

    private async getDimension(url: string): Promise<string> {
        const result = await this.client.get(`${url}`);
        return result.data.dimension as string
    }

    public async deleteProviderHistory(url: string): Promise<string> {
        const result = await this.client.delete(url);
        return result.data;
    }

    public createProviderHistory = async (providerHistory: ProviderHistoryInput): Promise<string> => {

        const dateValidationMessage = this.validateDate(providerHistory.date);
        if (dateValidationMessage) return dateValidationMessage;
       

        try {
            const request = this.createProviderHistoryRequest(providerHistory);
            const response = await this.client.post(`${this.baseUrl}/provider-history`, request);

            return response.data.date!== undefined ? 'ok' : this.extractErrorMessage(response);
        } catch (error) {
            console.error('Произошла ошибка:', error);
            return this.extractErrorMessage(error);
        }
    }

    public update = async (ProviderHistory: ProviderHistoryInput, url: string): Promise<string> => {
        this.deleteProviderHistory(url)
        const code = await this.createProviderHistory(ProviderHistory);
        return code
    }

    private validateDate(date: string): string | null {
        const dateDate = new Date(date);
        const currentDate = new Date();
        if (dateDate > currentDate) return "Дата конца не может быть больше текущей даты";
        return null;
    }

    private createProviderHistoryRequest(providerHistory: ProviderHistoryInput): ProviderHistoryRequest {
        return new ProviderHistoryRequest(
            `${providerHistory.date}T00:00:00Z`, 
            providerHistory.price, 
            providerHistory.food, 
            providerHistory.provider, 
            providerHistory.dimension,
            providerHistory.number)
    }

    private extractErrorMessage(response: any): string {
        // @ts-ignore
        const responseBody = response?.text ? response.text() : JSON.stringify(response);
        // @ts-ignore
        const jsonResponse = JSON.parse(responseBody);
        return jsonResponse.message || 'Произошла ошибка';
    }
}
