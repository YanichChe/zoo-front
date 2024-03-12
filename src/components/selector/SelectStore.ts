import { makeAutoObservable } from "mobx"
import { Variant } from '../../styles/tc/types'

export class SelectStore {
    choice = Variant.SECONDARY

    notChoice = Variant.EXTRA

    selectedOption: string = ''

    setSelectedOption = (option: string) => {
        console.log(this)
        this.selectedOption = option
    }

    constructor() {
        makeAutoObservable(this)
    }

    get textColor() {
        if (this.selectedOption === 'не определен') {
            return this.notChoice
        }
        return this.choice
    }
}
