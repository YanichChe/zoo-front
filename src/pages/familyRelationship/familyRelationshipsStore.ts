import { makeAutoObservable } from 'mobx'

class FamilyRelationshipsStore {
    individualId1 = ''
    individualId2 = ''
    typeRelationship = ''
    self = ''

    constructor() {
        makeAutoObservable(this)
    }

    setTypeRelationship(typeRelationship: string) {
        this.typeRelationship = typeRelationship
    }

    setIndividualId1(individualId1: string) {
        this.individualId1 = individualId1
    }

    setIndividualId2(individualId2: string) {
        this.individualId2 = individualId2
    }

    setSelf(self: string) {
        this.self = self
    }

    getSelf = (): string => {
        return this.self
    }

    getIndividualId1 = (): string => {
        return this.individualId1
    }

    getIndividualId2 = (): string => {
        return this.individualId2
    }

    getTypeRelationship = (): string => {
        return this.typeRelationship
    }
  
}

export const familyRelationshipsStore = new FamilyRelationshipsStore()
