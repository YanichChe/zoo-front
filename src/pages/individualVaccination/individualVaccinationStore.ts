import { makeAutoObservable } from 'mobx'

class IndividualsVaccinationStore {
    date = ''
    individual =  ''
    staff = ''
    vacccination = ''
    self = ''

    constructor() {
        makeAutoObservable(this)
    }
    setSelf = (self: string) => {
        this.self = self
    }

    getSelf = (): string => {
        return this.self
    }

  
    setIndividual = (individual: string) => {
        this.individual = individual
    }

    setStaff = (staff: string) => {
        this.staff = staff
    }
    setVacccination = (vacccination: string) => {
        this.vacccination = vacccination
    }

    getVacccination = (): string => {
        return this.vacccination
    }

    getDate = (): string => {
        return this.date
    }

    setDate = (date: string) => {
        this.date = date
    }

    getIndividual = (): string => {
        return this.individual
    }

    getStaff = (): string => {
        return this.staff
    }
  
}

export const individualsVaccinationStore = new IndividualsVaccinationStore()
