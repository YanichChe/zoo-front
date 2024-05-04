import { makeAutoObservable } from "mobx"
import { Gender } from "../../services/animalService/Animal.types"
import { AgregatorType } from "../../components/agregator/AgregatorStore";

export class AnimalFilter {

    constructor() {
        makeAutoObservable(this)
    }

    type = AgregatorType.UP

    page: number = 0

    size: number = 5

    gender: string = 'пол'

    status: string = 'статус'

    nameOrder: string | null = null

    setPage(pageNumber: number) {
        this.page = pageNumber
    }

     getStatusByText(status: string | null): boolean | null {
        if (status === null) return null

        const statusMap: Map<string, boolean | null> = new Map()
        statusMap.set('статус', null)
        statusMap.set('жив', true)
        statusMap.set('не жив', false)

        const result = statusMap.get(status)
        if (result === undefined) {
            return null
        }
        return result
    }

    getOrderByText(order: string | null ): string | null{
        if (order === null) return null
        const orderMap: Map<string, string | null> = new Map()
        orderMap.set('none', null)
        orderMap.set('up', 'asc')
        orderMap.set('down', 'desc')

        const result = orderMap.get(order)
        if (result === undefined) {
            return null
        }
        return result
    }

    setGender(value: Gender) {
        this.gender = value
        console.log(this.gender)
    }

    setStatus (value: string ) {
        this.status = value
        console.log(this.status)
    }

    setNameOrder (value: string) {
        console.log(value)
        this.nameOrder = value
    }

    getFilters() {
        const filters: { [key: string]: boolean | null | number | string | string[] } = {}

        console.log('gender: ' + this.gender)
        console.log('nameOrder: ' + this.nameOrder)

        let sorts: string = '';
        if (this.nameOrder !== null) {
            sorts = 'name' + this.getOrderByText(this.nameOrder);
            filters.sorts = sorts;
        }

        filters.isAlive = this.getStatusByText(this.status)

         if (this.gender !==  'пол') {
             filters.gender = this.gender === 'женский' ? 1 : 2
         }

        console.log(filters)
        return filters
    }
}

export const animalFilter = new AnimalFilter();
