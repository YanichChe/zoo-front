import { makeAutoObservable } from 'mobx'

class OffspringFactorsStore {
    animalId = '';
    physicalStateId = '';
    ageStart = 0;
    ageEnd = 0;
    self = ''

    constructor() {
        makeAutoObservable(this)
    }

  getSelf = (): string => {
    return this.self
  }

  getPhysicalStateId = (): string => {
    return this.physicalStateId
  }
  getAnimalId = (): string => {
    return this.animalId
  }

  getAgeStart = (): number => {
    return this.ageStart
  }

  getAgeEnd = (): number => {
    return this.ageEnd
  }

  setSelf = (self: string) => {
    this.self = self
  }

  setAnimalId = (animalId: string) => {
    this.animalId = animalId
  }

  setPhysicalStateId = (physicalStateId: string) => {
    this.physicalStateId = physicalStateId
  }

  setAgeStart = (ageStart: number) => {
    this.ageStart = ageStart
  }

  setAgeEnd = (ageEnd: number) => {
    this.ageEnd = ageEnd
  }
  
}

export const offspringFactorsStore = new OffspringFactorsStore()
