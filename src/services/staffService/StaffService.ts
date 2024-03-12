import { AbstractService } from "../AbstractService";
import { GetStaffListParameters } from "./Staff.types";
import {GetAnimalListParameters} from "../animalService/Animal.types";

export type StaffDto = {
    name: string,
    surname: string,
    middleName: string,
    gender: string,
    photoId: number,
    birthday: string,
    staffType: string,
}

export class StaffService extends AbstractService {
    public async getListStaffs(options: GetStaffListParameters): Promise<StaffDto[]> {
        const result = await this.client.get(`${this.baseUrl}/staffs`, options)
        return result.data as StaffDto[]
    }

    public async getListStaffsCount(options: GetAnimalListParameters): Promise<number> {
        const result = await this.client.get(`${this.baseUrl}/staffs/count`, options)
        return result.data
    }
}