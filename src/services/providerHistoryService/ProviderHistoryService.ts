import { AbstractService } from "../AbstractService";
import { ProviderHistory, ProviderHistoryDto, EmbeddedDto } from "./ProviderHistory.types";

export class ProviderHistoryService extends AbstractService {
    public async getList(): Promise<ProviderHistory[]> {
        const result = await this.client.get(`${this.baseUrl}/provider-history`)
        const cellHistoryArray: ProviderHistory[] = await this.getDietCharacteristicArray(result.data);
        return cellHistoryArray
    }


    private async getDietCharacteristicArray(embeddedDto: EmbeddedDto): Promise<ProviderHistory[]> {

        const { _embedded } = embeddedDto;
        if (!_embedded || !(_embedded['provider-history'] instanceof Array)) {
            return [];
        }

        const dietCharacteristicDtos: ProviderHistoryDto[] = _embedded['provider-history'];
    
        const dietCharacteristicArray: Promise<ProviderHistory>[] = dietCharacteristicDtos.map(async (dietCharacteristicDto: ProviderHistoryDto) => {

            const { date, number, price } = dietCharacteristicDto;
            const provider = await this.getProvider(dietCharacteristicDto._links.provider.href);
            const food = await this.getFood(dietCharacteristicDto._links.food.href);
            const dimension = await this.getDimension(dietCharacteristicDto._links.dimension.href);
        

            return {
                date, number, price, provider, food, dimension
            };
        });

        return Promise.all(dietCharacteristicArray);
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
}
