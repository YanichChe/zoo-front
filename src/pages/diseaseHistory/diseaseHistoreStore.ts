import { makeAutoObservable } from 'mobx'

class DiseaseHistoryStore {
    dateStart = ''
    dateEnd = ''
    individual =  ''
    disease = ''
    self = ''

    constructor() {
        makeAutoObservable(this)
    }

    setDateStart = (dateStart: string) => {
        this.dateStart = dateStart
    }

    setSelf = (self: string) => {
        this.self = self
    }

    getSelf = (): string => {
        return this.self
    }

    setDateEnd = (dateEnd: string) => {
        this.dateEnd = dateEnd
    }

    setIndividual = (individual: string) => {
        this.individual = individual
    }

    getDateStart = (): string => {
        return this.dateStart
    }

    getDateEnd = (): string => {
        return this.dateEnd
    }

    getIndividual = (): string => {
        return this.individual
    }

    setDisease = (disease: string) => {
        this.disease = disease
    }

    getDisease = (): string => {
        return this.disease
    }
  
}

export const diseaseHistoryStore = new DiseaseHistoryStore()
