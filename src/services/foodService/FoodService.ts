import { AbstractService } from "../AbstractService";
import { Food, FoodDto, EmbeddedDto } from "./Food.types";

export class FoodService extends AbstractService {
    public async getList(): Promise<Food[]> {
        const result = await this.client.get(`${this.baseUrl}/foods`);
        const foodArray: Food[] = await this.getFoodArray(result.data);
        return foodArray;
    }

    private async getFoodArray(embeddedDto: EmbeddedDto): Promise<Food[]> {
        const { _embedded } = embeddedDto;
        if (!_embedded || !(_embedded['foods'] instanceof Array)) {
            return [];
        }
    
        const foodDtos: FoodDto[] = _embedded['foods'];
    
        const foodArray: Promise<Food>[] = foodDtos.map(async (foodDto: FoodDto) => {
            const feedType: string = await this.getFeedType(foodDto._links.feedType.href);
            return {
                foodName: foodDto.foodName,
                feedType: feedType,
            };
        });
    
        return Promise.all(foodArray);
    }

    private async getFeedType(url: string): Promise<string> {
        const result = await this.client.get(url);
        return result.data.type as string;
    }
}
