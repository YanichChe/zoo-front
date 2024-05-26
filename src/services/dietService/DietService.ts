import { AbstractService } from "../AbstractService";
import { Diet, DietDto, DietInput, DietRequest, EmbeddedDto } from "./Diet.types";

export class DietService extends AbstractService {

    public async getDiet(url: string): Promise<Diet> {
        const result = await this.client.get(url);
        const { count, time } = result.data;
        const dietCharacteristics = await this.getDietCharacteristics(result.data._links.dietCharacteristics.href);
        const food = await this.getFood(result.data._links.food.href);
        const dimension = await this.getDimension(result.data._links.dimension.href);
    
        return {
            count, time, dietCharacteristics, food, dimension, self: result.data._links.self.href,
        };
    }

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
                count, time, dietCharacteristics, food, dimension, self: dietCharacteristicDto._links.self.href,
            };
        });

        return Promise.all(dietCharacteristicArray);
    }

    private async getDietCharacteristics(url: string): Promise<number> {
        const result = await this.client.get(`${url}`);
        const url_ = await result.data._links.self.href;
        console.log(url_)
        const parts = url_.split('/');
        console.log(parts)
        return  +parts[parts.length - 1]
    }

    private async getFood(url: string): Promise<string> {
        const result = await this.client.get(`${url}`);
        return result.data.foodName as string
    }

    private async getDimension(url: string): Promise<string> {
        const result = await this.client.get(`${url}`);
        return result.data.dimension as string
    }
    
    public async deleteDiet(url: string): Promise<string> {
        const result = await this.client.delete(url);
        return result.data;
    }

    public createDiet = async (Diet: DietInput): Promise<string> => {
        try {
            const request = this.createDietRequest(Diet);
            const response = await this.client.post(`${this.baseUrl}/diet`, request);

            return response.data._links.self !== undefined ? 'ok' : this.extractErrorMessage(response);
        } catch (error) {
            console.error('Произошла ошибка:', error);
            return this.extractErrorMessage(error);
        }
    }

    public update = async (diet: DietInput, url: string): Promise<string> => {
        this.deleteDiet(url)
        const code = await this.createDiet(diet);
        return code
    }


    private createDietRequest(diet: DietInput): DietRequest {
        return new DietRequest(diet.count, diet.time, diet.dietCharacteristics, diet.food, diet.dimension);
    }

    private extractErrorMessage(response: any): string {
        // @ts-ignore
        const responseBody = response?.text ? response.text() : JSON.stringify(response);
        // @ts-ignore
        const jsonResponse = JSON.parse(responseBody);
        return jsonResponse.message || 'Произошла ошибка';
    }
}
