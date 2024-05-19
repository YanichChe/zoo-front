import { makeAutoObservable } from 'mobx'

class ResponsibleAnimalStore {
    dateStart = ''
    dateEnd = ''
    individual =  ''
    staff= ''
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

    setStaff = (staff: string) => {
        this.staff = staff
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

    getStaff = (): string => {
        return this.staff
    }
  
}

export const responsibleAnimalStore = new ResponsibleAnimalStore()
