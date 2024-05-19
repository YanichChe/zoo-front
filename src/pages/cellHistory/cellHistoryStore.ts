import { makeAutoObservable } from 'mobx'

class CellHistoryStore {
    dateStart = ''
    dateEnd = ''
    individual =  ''
    cellNumber = -1
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

    setNumber = (cellNumber: number) => {
        this.cellNumber = cellNumber
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

    getCellNumber = (): number => {
        return this.cellNumber
    }
  
}

export const cellHistoryStore = new CellHistoryStore()
