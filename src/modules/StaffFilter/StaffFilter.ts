import { makeAutoObservable } from "mobx"
import { Gender } from "../../services/animalService/Animal.types"
import { AgregatorType } from "../../components/agregator/AgregatorStore";

export class StaffFilter {

    constructor() {
        makeAutoObservable(this)
    }

    type = AgregatorType.UP

    page: number = 0

    size: number = 5

    gender: string | null = 'пол'

    nameOrder: string | null = null

    setPage(pageNumber: number) {
        this.page = pageNumber
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

    setNameOrder (value: string) {
        console.log(value)
        this.nameOrder = value
    }

    getFilters() {
        const filters: { [key: string]: boolean | null | number | string | string[] } = {}

        let sorts: string = '';
        if (this.nameOrder !== null) {
            sorts = 'surname' + this.getOrderByText(this.nameOrder);
            filters.sorts = sorts;
        }


        if (this.gender !==  'пол') {
            filters.gender = this.gender === 'женский' ? 1 : 2
        }

        console.log(filters)
        return filters
    }
}

export const staffFilter = new StaffFilter();
