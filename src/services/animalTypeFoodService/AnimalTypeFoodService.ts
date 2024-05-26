import { AbstractService } from "../AbstractService";
import { AnimalTypeFood, AnimalTypeFoodDto, EmbeddedDto } from "./AnimalTypeFood.types";

export class AnimalTypeFoodService extends AbstractService {
    public async getList(): Promise<AnimalTypeFood[]> {
        const result = await this.client.get(`${this.baseUrl}/animal-type-food`);
        const animalTypeFoodArray: AnimalTypeFood[] = await this.getAnimalTypeFoodArray(result.data);
        return animalTypeFoodArray;
    }

    private async getAnimalTypeFoodArray(embeddedDto: EmbeddedDto): Promise<AnimalTypeFood[]> {
        const { _embedded } = embeddedDto;
        if (!_embedded || !(_embedded['animal-type-food'] instanceof Array)) {
            return [];
        }

        const animalTypeFoodDtos: AnimalTypeFoodDto[] = _embedded['animal-type-food'];

        const animalTypeFoodArray: Promise<AnimalTypeFood>[] = animalTypeFoodDtos.map(async (animalTypeFoodDto: AnimalTypeFoodDto) => {
            return {
                animalTitle: animalTypeFoodDto.animalTitle,
                foodName: animalTypeFoodDto.foodName,
                feedType: animalTypeFoodDto.feedType,
                age: animalTypeFoodDto.age,
            };
        });

        return Promise.all(animalTypeFoodArray);
    }
}
