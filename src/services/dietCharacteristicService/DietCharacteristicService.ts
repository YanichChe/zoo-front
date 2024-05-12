import { AbstractService } from "../AbstractService";
import { DietCharacteristic, DietCharacteristicDto, EmbeddedDto } from "./DietCharacteristic.types";

export class DietCharacteristicService extends AbstractService {
    
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
}
