import { makeAutoObservable } from 'mobx'

class DietCharacteristicStore {
    age = 0;
    physicalState = '';
    season = '';
    animal = '';
    self = '';

    constructor() {
        makeAutoObservable(this)
    }

    getAge = (): number => {
        return this.age
    }
    getPhysicalState = (): string => {
        return this.physicalState
    }
    getSeason = (): string => {
        return this.season
    }
    getAnimal = (): string => {
        return this.animal
    }

    setAge = (age: number) => {
        this.age = age
    }

    setPhysicalState = (physicalState: string) => {
        this.physicalState = physicalState
    }

    setSeason = (season: string) => {
        this.season = season
    }

    setAnimal = (animal: string) => {
        this.animal = animal
    }

    setSelf = (self: string) => {
        this.self = self
    }

    getSelf = (): string => {
        return this.self
    }
}
export const dietCharacteristicStore = new DietCharacteristicStore()
