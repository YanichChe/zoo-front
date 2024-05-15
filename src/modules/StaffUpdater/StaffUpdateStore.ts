import { makeAutoObservable } from "mobx";
import { StaffDto } from "../../services/staffService/StaffService";

class StaffUpdateStore {

    staffDto: StaffDto | null = null;

    constructor() {
        makeAutoObservable(this)
    }

    setStaffDto(staffDto: StaffDto) {
        this.staffDto = staffDto
    }

    getStaff() {
        return this.staffDto
    }
}

export const staffUpdateStore = new StaffUpdateStore()
