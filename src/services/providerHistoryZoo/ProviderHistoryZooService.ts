import { AbstractService } from "../AbstractService";
import { ProviderHistoryZoo, ProviderHistoryZooDto, EmbeddedDto } from "./ProviderHistoryZoo.types";

export class ProviderHistoryZooService extends AbstractService {
    public async getList(): Promise<ProviderHistoryZoo[]> {
        const result = await this.client.get(`${this.baseUrl}/provider-history-zoo`);
        const providerHistoryZooArray: ProviderHistoryZoo[] = await this.getProviderHistoryZooArray(result.data);
        return providerHistoryZooArray;
    }

    private async getProviderHistoryZooArray(embeddedDto: EmbeddedDto): Promise<ProviderHistoryZoo[]> {
        const { _embedded } = embeddedDto;
        if (!_embedded || !(_embedded['provider-history-zoo'] instanceof Array)) {
            return [];
        }

        const providerHistoryZooDtos: ProviderHistoryZooDto[] = _embedded['provider-history-zoo'];

        const providerHistoryZooArray: Promise<ProviderHistoryZoo>[] = providerHistoryZooDtos.map(async (providerHistoryZooDto: ProviderHistoryZooDto) => {
            return {
                date: providerHistoryZooDto.date,
                provider: providerHistoryZooDto.provider,
                foodName: providerHistoryZooDto.foodName,
                feedType: providerHistoryZooDto.feedType,
                number: providerHistoryZooDto.number,
                dimension: providerHistoryZooDto.dimension,
                price: providerHistoryZooDto.price,
                selfSufficiency: providerHistoryZooDto.selfSufficiency,
            };
        });

        return Promise.all(providerHistoryZooArray);
    }
}
