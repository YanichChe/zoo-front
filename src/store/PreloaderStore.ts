import { makeAutoObservable } from 'mobx'

class PreloaderStore {
    isLoading = false

    constructor() {
        makeAutoObservable(this)
    }

    startLoading = () => {
        this.isLoading = true
    }

    endLoading = () => {
        this.isLoading = false
    }
}

export const preloaderStore = new PreloaderStore()
