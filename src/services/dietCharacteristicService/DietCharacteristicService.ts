import { AbstractService } from "../AbstractService";
import { DietCharacteristic, DietCharacteristicDto, DietCharacteristicInput, DietCharacteristicRequest, EmbeddedDto } from "./DietCharacteristic.types";

export class DietCharacteristicService extends AbstractService {
    
    public async getDietCharacteristic(url: string): Promise<DietCharacteristic> {
        const result = await this.client.get(url);
        const { age } = result.data;
        const physicalState: string = await this.getPhysicalState(result.data._links.physicalState.href);
        const season: string = await this.getSeason(result.data._links.season.href);
        const animal: string = await this.getAnimal(result.data._links.animal.href);

        return {
            age, 
            physicalState,
            season,
            animal,
            self: result.data._links.self.href,
        };
    }


    public async getList(): Promise<DietCharacteristic[]> {
        const result = await this.client.get(`${this.baseUrl}/diet-characteristics`)
        const cellHistoryArray: DietCharacteristic[] = await this.getDietCharacteristicArray(result.data);
        return cellHistoryArray
    }


    private async getDietCharacteristicArray(embeddedDto: EmbeddedDto): Promise<DietCharacteristic[]> {

        const { _embedded } = embeddedDto;
        if (!_embedded || !(_embedded['diet-characteristics'] instanceof Array)) {
            return [];
        }

        const dietCharacteristicDtos: DietCharacteristicDto[] = _embedded['diet-characteristics'];
    
        const dietCharacteristicArray: Promise<DietCharacteristic>[] = dietCharacteristicDtos.map(async (dietCharacteristicDto: DietCharacteristicDto) => {

            const { age } = dietCharacteristicDto;
            const physicalState: string = await this.getPhysicalState(dietCharacteristicDto._links.physicalState.href);
            const season: string = await this.getSeason(dietCharacteristicDto._links.season.href);
            const animal: string = await this.getAnimal(dietCharacteristicDto._links.animal.href);

            return {
                age, 
                physicalState,
                season,
                animal,
                self: dietCharacteristicDto._links.self.href,
            };
        });

        return Promise.all(dietCharacteristicArray);
    }

    private async getPhysicalState(url: string): Promise<string> {
        const result = await this.client.get(`${url}`)
        return result.data.state as string
    }

    private async getSeason(url: string): Promise<string> {
        const result = await this.client.get(`${url}`)
        return result.data.season as string
    }

    private async getAnimal(url: string): Promise<string> {
        const result = await this.client.get(`${url}`)
        return result.data.animalTitle as string
    }

    public async deleteDietCharacteristic(url: string): Promise<string> {
        const result = await this.client.delete(url);
        return result.data;
    }

    public createDietCharacteristic = async (DietCharacteristic: DietCharacteristicInput): Promise<string> => {
        try {
            const request = this.createDietCharacteristicRequest(DietCharacteristic);
            const response = await this.client.post(`${this.baseUrl}/diet-characteristics`, request);

            return response.data._links.self!== undefined ? 'ok' : this.extractErrorMessage(response);
        } catch (error) {
            console.error('Произошла ошибка:', error);
            return this.extractErrorMessage(error);
        }
    }

    public update = async (DietCharacteristic: DietCharacteristicInput, url: string): Promise<string> => {
        this.deleteDietCharacteristic(url)
        const code = await this.createDietCharacteristic(DietCharacteristic);
        return code
    }

    private createDietCharacteristicRequest(dietCharacteristic: DietCharacteristicInput): DietCharacteristicRequest {
        return new DietCharacteristicRequest(dietCharacteristic.age, dietCharacteristic.physicalState, dietCharacteristic.season, dietCharacteristic.animal);
    }

    private extractErrorMessage(response: any): string {
        // @ts-ignore
        const responseBody = response?.text ? response.text() : JSON.stringify(response);
        // @ts-ignore
        const jsonResponse = JSON.parse(responseBody);
        return jsonResponse.message || 'Произошла ошибка';
    }
}
