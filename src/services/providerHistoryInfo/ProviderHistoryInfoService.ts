import { AbstractService } from "../AbstractService";
import { ProviderHistoryInfo, ProviderHistoryInfoDto, EmbeddedDto } from "./ProviderHistoryInfo.types";

export class ProviderHistoryInfoService extends AbstractService {
    public async getList(): Promise<ProviderHistoryInfo[]> {
        const result = await this.client.get(`${this.baseUrl}/provider-history-info`);
        const providerHistoryInfoArray: ProviderHistoryInfo[] = await this.getProviderHistoryInfoArray(result.data);
        return providerHistoryInfoArray;
    }

    private async getProviderHistoryInfoArray(embeddedDto: EmbeddedDto): Promise<ProviderHistoryInfo[]> {
        const { _embedded } = embeddedDto;
        if (!_embedded || !(_embedded['provider-history-info'] instanceof Array)) {
            return [];
        }

        const providerHistoryInfoDtos: ProviderHistoryInfoDto[] = _embedded['provider-history-info'];

        const providerHistoryInfoArray: Promise<ProviderHistoryInfo>[] = providerHistoryInfoDtos.map(async (providerHistoryInfoDto: ProviderHistoryInfoDto) => {
            return {
                rowNum: providerHistoryInfoDto.rowNum,
                date: providerHistoryInfoDto.date,
                provider: providerHistoryInfoDto.provider,
                foodName: providerHistoryInfoDto.foodName,
                feedType: providerHistoryInfoDto.feedType,
                number: providerHistoryInfoDto.number,
                dimension: providerHistoryInfoDto.dimension,
                price: providerHistoryInfoDto.price,
            };
        });

        return Promise.all(providerHistoryInfoArray);
    }
}
