import { makeAutoObservable } from 'mobx'
import { AnimalDto } from "../../services/animalService/AnimalService";

class AnimalStore {

    animalsDto: AnimalDto[] = []
    animalsCount: number = 0

    constructor() {
        makeAutoObservable(this)
    }

    setAnimalsCount(count: number) {
        this.animalsCount = count
    }

    getCount() {
        return this.animalsCount
    }

    setAnimalsDto(animalDtos: AnimalDto[]) {
        this.animalsDto = animalDtos
    }

    getAnimals() {
        return this.animalsDto
    }
}

export const animalStore = new AnimalStore()
