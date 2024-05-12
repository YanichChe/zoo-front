import { AbstractService } from "../AbstractService";
import { FoodProvider, FoodProviderDto, EmbeddedDto } from "./FoodProvider.types";

export class FoodProviderService extends AbstractService {
    public async getList(): Promise<FoodProvider[]> {
        const result = await this.client.get(`${this.baseUrl}/food-providers`);
        const foodProviderArray: FoodProvider[] = this.getFoodProviderArray(result.data);
        return foodProviderArray;
    }

    private getFoodProviderArray(embeddedDto: EmbeddedDto): FoodProvider[] {
        const { _embedded } = embeddedDto;
        if (!_embedded || !(_embedded['food-providers'] instanceof Array)) {
            return [];
        }
    
        const foodProviderDtos: FoodProviderDto[] = _embedded['food-providers'];
        return foodProviderDtos.map((foodProviderDto: FoodProviderDto) => ({
            provider: foodProviderDto.provider,
        }));
    }
}
