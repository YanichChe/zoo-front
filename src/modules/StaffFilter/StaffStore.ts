import { makeAutoObservable } from 'mobx'
import { StaffDto } from "../../services/staffServiceService/StaffService";

class StaffStore {

    staffs: StaffDto[] = []
    animalsCount: number = 0

    setStaffsCount(count: number) {
        this.animalsCount = count
    }

    getCount() {
        return this.animalsCount
    }

    constructor() {
        makeAutoObservable(this)
    }

    setStaffsDto(staffs: StaffDto[]) {
        this.staffs = staffs
    }

     getStaffs() {
        return this.staffs
    }
}

export const staffStore = new StaffStore() // Singleton instance
