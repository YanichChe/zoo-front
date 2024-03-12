import { AbstractService } from "../AbstractService";
import { GetAnimalListParameters } from "./Animal.types";

export type AnimalDto = {
    name: string,
    isAlive: boolean
    date: string
    gender: string,
    height: number,
    weight: number,
    photoId: number,
    animalAnimalTitle: string
}

export class AnimalService extends AbstractService {
    public async getListAnimals(options: GetAnimalListParameters): Promise<AnimalDto[]> {
        const result = await this.client.get(`${this.baseUrl}/animals`, options)
        return result.data as AnimalDto[]
    }

    public async getListAnimalsCount(options: GetAnimalListParameters): Promise<number> {
        const result = await this.client.get(`${this.baseUrl}/animals/count`, options)
        return result.data
    }
}
