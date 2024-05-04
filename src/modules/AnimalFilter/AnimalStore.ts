import { makeAutoObservable } from 'mobx'
import { AnimalDto } from "../../services/animalService/AnimalService";

class AnimalStore {

    animalsDto: AnimalDto[] = []
    animalsCount: number = 0
    animalsTitleList: string[] = []

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

    setAnimalsTitleList(list: string[]) {
        this.animalsTitleList = list
    }

    getAnimalsTitleList() {
        return this.animalsTitleList
    }
}

export const animalStore = new AnimalStore()
