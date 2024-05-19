import { makeAutoObservable } from 'mobx'

class ProhibitesStore {
    animal1 = ''
    animal2 = ''
    self = ''

    constructor() {
        makeAutoObservable(this)
    }

    setAnimal1 = (animal1: string) => {
        this.animal1 = animal1
    }

    setAnimal2 = (animal2: string) => {
        this.animal2 = animal2
    }

    getAnimal1 = (): string => {
        return this.animal1
    }

    getAnimal2 = (): string => {
        return this.animal2
    }

    setSelf = (self: string) => {
        this.self = self
    }

    getSelf = (): string => {
        return this.self
    }
  
}

export const prohibitedStore = new ProhibitesStore()
