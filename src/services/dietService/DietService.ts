import { AbstractService } from "../AbstractService";
import { Diet, DietDto, EmbeddedDto } from "./Diet.types";

export class DietService extends AbstractService {
    public async getList(): Promise<Diet[]> {
        const result = await this.client.get(`${this.baseUrl}/diet`)
        const cellHistoryArray: Diet[] = await this.getDietCharacteristicArray(result.data);
        return cellHistoryArray
    }


    private async getDietCharacteristicArray(embeddedDto: EmbeddedDto): Promise<Diet[]> {

        const { _embedded } = embeddedDto;
        if (!_embedded || !(_embedded['diet'] instanceof Array)) {
            return [];
        }

        const dietCharacteristicDtos: DietDto[] = _embedded['diet'];
    
        const dietCharacteristicArray: Promise<Diet>[] = dietCharacteristicDtos.map(async (dietCharacteristicDto: DietDto) => {

            const { count, time } = dietCharacteristicDto;
            const dietCharacteristics = await this.getDietCharacteristics(dietCharacteristicDto._links.dietCharacteristics.href);
            const food = await this.getFood(dietCharacteristicDto._links.food.href);
            const dimension = await this.getDimension(dietCharacteristicDto._links.dimension.href);
        

            return {
                count, time, dietCharacteristics, food, dimension
            };
        });

        return Promise.all(dietCharacteristicArray);
    }

    private async getDietCharacteristics(url: string): Promise<string> {
        const result = await this.client.get(`${url}`);
        return result.data.id as string
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
