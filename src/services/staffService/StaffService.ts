import { AbstractService } from "../AbstractService";
import { EmbeddedDto, GetStaffListParameters, staffShort, staffShortDto } from "./Staff.types";
import { GetAnimalListParameters } from "../animalService/Animal.types";
import { ImageType } from "react-images-uploading/dist/typings";

export type StaffDto = {
    name: string,
    surname: string,
    middleName: string,
    gender: string,
    photoId: number,
    birthday: string,
    staffType: string,
    id: number
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

    public async delete(id: number | undefined) {
        const result = await this.client.delete(`${this.baseUrl}/staffs/${id}`)
        return result.data
    }

    public save = async (images: ImageType[], name: string, surname: string, middleName: string, date: string, gender: string) => {
        if (name === '' || surname === '' || middleName === '' || gender === '') return 'Вы оставили пустые значения'
        try {
            const formData = new FormData()
            if (images[0] !== undefined) {
                // @ts-ignore
                formData.append('image', images[0].file) // Первое изображение из списка
            }
            formData.append('name', name)
            formData.append('middleName', middleName)
            formData.append('surname', surname)
            formData.append('birthday', date)
            formData.append('gender', gender === 'женский' ? JSON.stringify(1) : JSON.stringify(2))

            const response = await fetch(`${this.baseUrl}/staffs`, {
                method: 'POST',
                body: formData,
            })

            // Обработка ответа от бэкенда
            if (response.ok) {
                console.log('Изображение успешно отправлено на бэкенд')
                return 'ok'
            } else {
                console.error('Ошибка при отправке изображения на бэкенд' + ' ' + response.body)
                const responseBody = await response.text()
                const jsonResponse = JSON.parse(responseBody)
                return jsonResponse.message

            }
        } catch (error) {
            console.error('Произошла ошибка:', error)
            return 'Неожиданная ошибка'
        }
    }

    public update = async (id: number | undefined, images: ImageType[], name: string, middleName: string, surname: string,
                           date: string | undefined, gender: string) => {

        console.log(id)
        if (name === '' || surname === '' || middleName === '' || gender === '') return 'Вы оставили пустые значения'
        if (id === undefined || date === undefined)
            return 'Не заполнены поля'
        try {
            let response
            const formData = new FormData()
            if (images[0] !== undefined) {
                // @ts-ignore
                formData.append('image', images[0].file)
            }

            formData.append('name', name)
            formData.append('middleName', middleName)
            formData.append('surname', surname)
            formData.append('birthday', date)
            formData.append('gender', gender === 'женский' ? JSON.stringify(1) : JSON.stringify(2))

            response = await fetch(`${this.baseUrl}/staffs/${id}`, {
                method: 'Put',
                body: formData,
            })


            // Обработка ответа от бэкенда
            // @ts-ignore
            if (response.ok) {
                console.log('Изображение успешно отправлено на бэкенд')
                return 'ok'
            } else {
                // @ts-ignore
                console.error('Ошибка при отправке изображения на бэкенд' + ' ' + response.body)
                // @ts-ignore
                const responseBody = await response.text()
                const jsonResponse = JSON.parse(responseBody)
                return jsonResponse.message

            }
        } catch (error) {
            console.error('Произошла ошибка:', error)
            return 'Неожиданная ошибка'
        }
    }

    public async getList(): Promise<staffShort[]> {
        const result = await this.client.get(`${this.baseUrl}/staff-list`);
        const staffShortArray: staffShort[] = await this.getstaffShortArray(result.data);
        console.log(staffShortArray)
        return staffShortArray;
    }

    private async getstaffShortArray(embeddedDto: EmbeddedDto): Promise<staffShort[]> {
        const { _embedded } = embeddedDto;
        if (!_embedded || !(_embedded['staff-list'] instanceof Array)) {
            return [];
        }
    
        const staffShortDtos: staffShortDto[] = _embedded['staff-list'];
    
        const staffShortArray: Promise<staffShort>[] = staffShortDtos.map(async (staffShortDto: staffShortDto) => {
            const { name, middleName, surname } = staffShortDto;
            const self: string = staffShortDto._links.self.href;
            return { 
                name,
                surname,
                middleName, 
                self,
            };
        });
    
        return Promise.all(staffShortArray);
    }
}
