import { makeAutoObservable } from 'mobx'

class DietStore {
    count = 0;
    time = '';
    dietCharacteristics = 0;
    food = '';
    dimension = '';
    self = ''

    constructor() {
        makeAutoObservable(this)
    }

    getCount = (): number => {
        return this.count
    }

    getTime = (): string => {
        return this.time
    }

    getDietCharacteristics = (): number => {
        return this.dietCharacteristics
    }

    getFood = (): string => {
        return this.food
    }

    getDimension = (): string => {
        return this.dimension
    }

    getSelf = (): string => {
        return this.self
    }

    setCount = (count: number) => {
        this.count = count
    }

    setTime = (time: string) => {
        this.time = time
    }

    setDietCharacteristics = (dietCharacteristics: number) => {
        this.dietCharacteristics = dietCharacteristics
    }

    setFood = (food: string) => {
        this.food = food
    }

    setDimension = (dimension: string) => {
        this.dimension = dimension
    }

    setSelf = (self: string) => {
        this.self = self
    }
}

export const dietStore = new DietStore()
