import { makeAutoObservable } from 'mobx'

class IndividualStore {
    receiptDate = '';
    individual = '';
    individualStatus = '';
    zoo = '';
    self = '';

    constructor() {
        makeAutoObservable(this)
    }

    getSelf = (): string => {
        return this.self
    }

    setSelf = (self: string) => {
        this.self = self
    }

    getIndividual = (): string => {
        return this.individual
    }

    setIndividual = (individual: string) => {
        this.individual = individual
    }

    getIndividualStatus = (): string => {
        return this.individualStatus
    }

    setIndividualStatus = (individualStatus: string) => {
        this.individualStatus = individualStatus
    }

    getZoo = (): string => {
        return this.zoo
    }

    setZoo = (zoo: string) => {
        this.zoo = zoo
    }
    getReceiptDate = (): string => {
        return this.receiptDate
    }

    setReceiptDate = (receiptDate: string) => {
        this.receiptDate = receiptDate
    }
}

export const individualHistoryStore = new IndividualStore()
