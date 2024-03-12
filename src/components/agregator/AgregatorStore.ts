import { makeAutoObservable } from "mobx"

import up from '../../assets/up.svg'
import down from '../../assets/down.svg'
import none from '../../assets/none.svg'

export enum AgregatorType {
    UP = 'up',
    DOWN = 'down',
    NONE = 'none',
}

export class AgregatorStore {
    icon: AgregatorType = AgregatorType.NONE

    constructor() {
        makeAutoObservable(this)
    }

    private getIconByType(type: AgregatorType): string {
        const iconMap: Map<AgregatorType, string> = new Map([
            [AgregatorType.UP, up],
            [AgregatorType.DOWN, down],
            [AgregatorType.NONE, none],
        ])

        return iconMap.get(type) || none
    }

    switch() {
        if (this.icon === AgregatorType.NONE)  this.icon = AgregatorType.UP
        else if (this.icon === AgregatorType.UP) this.icon = AgregatorType.DOWN
        else this.icon = AgregatorType.NONE
    }

    get agregatorIcon() {
        return this.getIconByType(this.icon)
    }

    get sort() {
        return this.icon
    }

}

export const agregatorStore = new AgregatorStore();
