import { AbstractService } from "../AbstractService";
import { GetAnimalListParameters } from "./Animal.types";
import {ImageType} from "react-images-uploading/dist/typings";

export type AnimalDto = {
    name: string,
    isAlive: boolean
    date: string
    gender: string,
    height: number,
    weight: number,
    photoId: number,
    animalAnimalTitle: string
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

    public save = async (images: ImageType[], name:string, animalTitle: string, isAlive: boolean, date:string, gender: string, height:number, weight: number) => {
        try {
            const formData = new FormData();
            // @ts-ignore
            formData.append('image', images[0].file); // Первое изображение из списка
            formData.append('name', 'А');
            formData.append('animalTitle', animalTitle);
            formData.append('isAlive', JSON.stringify(isAlive));
            formData.append('date', date);
            formData.append('gender', gender === 'женский'? JSON.stringify(1) : JSON.stringify(2));
            formData.append('height', height.toString());
            formData.append('weight', weight.toString());

            const response = await fetch(`${this.baseUrl}/animals`, {
                method: 'POST',
                body: formData,
            });

            // Обработка ответа от бэкенда
            if (response.ok) {
                console.log('Изображение успешно отправлено на бэкенд');
            } else {
                console.error('Ошибка при отправке изображения на бэкенд');
            }
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    }
}
