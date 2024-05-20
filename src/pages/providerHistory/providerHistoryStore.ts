import { makeAutoObservable } from 'mobx'

class ProviderHistoryStore {
    date = '';
    number = 0;
    price = 0;
    food = '';
    provider = '';
    dimension = '';
    self = ''

    constructor() {
        makeAutoObservable(this)
    }

    setDate = (date: string) => {
        this.date = date
    }

    setNumber = (number: number) => {
        this.number = number
    }

    setPrice = (price: number) => {
        this.price = price
    }

    setFood = (food: string) => {
        this.food = food
    }

    setProvider = (provider: string) => {
        this.provider = provider
    }

    setDimension = (dimension: string) => {
        this.dimension = dimension
    }

    setSelf = (self: string) => {
        this.self = self
    }

    getDate = () => {
        return this.date
    }

    getNumber = () => {
        return this.number
    }

    getPrice = () => {
        return this.price
    }

    getFood = () => {
        return this.food
    }

    getProvider = () => {
        return this.provider
    }

    getDimension = () => {
        return this.dimension
    }

    getSelf = () => {
        return this.self
    }
}

export const providerHistoryStore = new ProviderHistoryStore()
