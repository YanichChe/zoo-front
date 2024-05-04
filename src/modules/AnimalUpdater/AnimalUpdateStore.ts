import { AnimalDto } from "../../services/animalService/AnimalService";
import { makeAutoObservable } from "mobx";

class AnimalUpdateStore {

    animalDto: AnimalDto | null = null;

    constructor() {
        makeAutoObservable(this)
    }

    setAnimalDto(animalDto: AnimalDto) {
        this.animalDto = animalDto
    }

    getAnimal() {
        return this.animalDto
    }
}

export const animalUpdateStore = new AnimalUpdateStore()
