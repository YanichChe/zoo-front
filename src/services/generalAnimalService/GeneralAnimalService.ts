import { AbstractService } from "../AbstractService";
import { Animal, AnimalDto, EmbeddedDto } from "./AnimalService.types";

export class GeneralAnimalService extends AbstractService {
    public async getList(): Promise<Animal[]> {
        const result = await this.client.get(`${this.baseUrl}/general-animal`)
        const animalArray: Animal[] = await this.getAnimalArray(result.data);
        console.log(animalArray)
        return animalArray
    }

    private async getClimateZone(url: string): Promise<string> {
        const result = await this.client.get(`${url}`)
        return result.data.climateZoneName as string
    }

    private async getNutritationType(url: string): Promise<string> {
        const result = await this.client.get(`${url}`)
        return result.data.type as string
    }

    private async getAnimalArray(embeddedDto: EmbeddedDto): Promise<Animal[]> {
        const { _embedded } = embeddedDto;
        if (!_embedded || !(_embedded['general-animal'] instanceof Array)) {
            return [];
        }
    
        const canimalDtos: AnimalDto[] = _embedded['general-animal'];
    
        const animalArray: Promise<Animal>[] = canimalDtos.map(async (animalDto: AnimalDto) => {
            const { animalTitle } = animalDto;
            const climateZone: string = await this.getClimateZone(animalDto._links.climateZone.href);
            const nutritionType: string = await this.getNutritationType(animalDto._links.nutritionType.href);
            return {
                animalTitle,
                climateZone,
                nutritionType
            };
        });
    
        return Promise.all(animalArray);
    }
}
