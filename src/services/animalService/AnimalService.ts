import { AbstractService } from "../AbstractService"
import { Gender, GetAnimalListParameters } from "./Animal.types"
import { ImageType } from "react-images-uploading/dist/typings"

export type AnimalDto = {
    name: string,
    isAlive: boolean
    date: string
    gender: string,
    height: number,
    weight: number,
    photoId: number,
    animalAnimalTitle: string
    id: number,
}

export class AnimalService extends AbstractService {

    public async getListAnimals(options: GetAnimalListParameters): Promise<AnimalDto[]> {
        const result = await this.client.get(`${this.baseUrl}/animals`, options)
        return result.data as AnimalDto[]
    }

    public async getListAnimalsTitles(): Promise<string[]> {
        const result = await this.client.get(`${this.baseUrl}/animals/titles`)
        return result.data as string[]
    }

    public async getListAnimalsCount(options: GetAnimalListParameters): Promise<number> {
        const result = await this.client.get(`${this.baseUrl}/animals/count`, options)
        return result.data
    }
    public async delete(id: number | undefined) {
        const result = await this.client.delete(`${this.baseUrl}/animals/${id}`)
        return result.data
    }

    public save = async (images: ImageType[], name:string, animalTitle: string, isAlive: boolean, date:string, gender: string, height:number, weight: number) => {
        try {
            const formData = new FormData()
            // @ts-ignore
            formData.append('image', images[0].file) // Первое изображение из списка
            formData.append('name', 'А')
            formData.append('animalTitle', animalTitle)
            formData.append('isAlive', JSON.stringify(isAlive))
            formData.append('date', date)
            formData.append('gender', gender === 'женский'? JSON.stringify(1) : JSON.stringify(2))
            formData.append('height', height.toString())
            formData.append('weight', weight.toString())

            const response = await fetch(`${this.baseUrl}/animals`, {
                method: 'POST',
                body: formData,
            })

            // Обработка ответа от бэкенда
            if (response.ok) {
                console.log('Изображение успешно отправлено на бэкенд')
                return  'ok'
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

    public update = async (id: number | undefined, images: ImageType[], name: string, animalTitle: string | undefined,
                           isAlive: boolean | undefined, date: string | undefined, gender: Gender | undefined, height: number | undefined, weight: number | undefined) => {
        console.log(id + ' ' + images  + ' ' + name + ' ' +
            animalTitle  + ' ' +  isAlive + ' ' +  date  + ' ' +  gender + ' ' +  height  + ' ' +  weight)
       if (id === undefined || animalTitle === undefined || date === undefined || height === undefined || weight === undefined)
           return 'Не заполнены поля'
        try {
            let response
            if (images[0] === undefined) {
                const formData = new FormData()
                formData.append('name', name)
                formData.append('animalTitle', animalTitle)
                formData.append('isAlive', JSON.stringify(isAlive))
                formData.append('date', date)
                formData.append('gender', gender === Gender.FEMALE? JSON.stringify(1) : JSON.stringify(2))
                formData.append('height', height.toString())
                formData.append('weight', weight.toString())

                response = await fetch(`${this.baseUrl}/animals/${id}`, {
                    method: 'Put',
                    body: formData,
                })
            }
            else {
                const formData = new FormData()
                // @ts-ignore
                formData.append('image', images[0].file) // Первое изображение из списка
                formData.append('name', name)
                formData.append('animalTitle', animalTitle)
                formData.append('isAlive', JSON.stringify(isAlive))
                formData.append('date', date)
                formData.append('gender', gender === Gender.FEMALE? JSON.stringify(1) : JSON.stringify(2))
                formData.append('height', height.toString())
                formData.append('weight', weight.toString())

                 response = await fetch(`${this.baseUrl}/animals/${id}`, {
                    method: 'Put',
                    body: formData,
                })
            }

            // Обработка ответа от бэкенда
            // @ts-ignore
            if (response.ok) {
                console.log('Изображение успешно отправлено на бэкенд')
                return  'ok'
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
}
