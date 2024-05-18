import { AbstractService } from "../AbstractService";
import { AccessAnimalDto, AccessAnimal, EmbeddedDto, AccessAnimalId, AccessAnimalRequest, AccessAnimalInput } from "./AccessAnimal.types";

export class AccessAnimalService extends AbstractService {

    public async getAccessAnimal(url: string): Promise<AccessAnimal> {
        const result = await this.client.get(`${url}`);
        const accessAnimal: AccessAnimal= await this.getAccessAnimalItem(result.data);
        return accessAnimal;
    }

    public async getList(): Promise<AccessAnimal[]> {
        const result = await this.client.get(`${this.baseUrl}/access-animals`);
        const prohibitedCombinationsSettlementArray: AccessAnimal[] = await this.getAccessAnimalArray(result.data);
        return prohibitedCombinationsSettlementArray;
    }

    private async getAccessAnimalArray(embeddedDto: EmbeddedDto): Promise<AccessAnimal[]> {
        const { _embedded } = embeddedDto;
        if (!_embedded || !(_embedded['access-animals'] instanceof Array)) {
            return [];
        }
    
        const accessAnimalDtos: AccessAnimalDto[] = _embedded['access-animals'];
    
        const accessAnimalArray: Promise<AccessAnimal>[] = accessAnimalDtos.map(async (accessAnimalDto: AccessAnimalDto) => {
            const { dateEnd } = accessAnimalDto;
            const individual: string = await this.getIndividual(accessAnimalDto._links.individual.href);
            const staff = await this.getStaff(accessAnimalDto._links.staff.href);
            const self = accessAnimalDto._links.self.href;

            const parts = accessAnimalDto._links.self.href.split('/');
            const datePart = parts[parts.length - 1].split('_');
            const dateStart = datePart[datePart.length - 1];
       
            return { 
                dateStart,
                dateEnd,
                individual,
                staff,
                self,
            };
        });
    
        return Promise.all(accessAnimalArray);
    }


    private async getAccessAnimalItem(accessAnimalDto: AccessAnimalDto): Promise<AccessAnimal> {

        const { dateEnd } = accessAnimalDto;
        const individual: string = await this.getIndividual(accessAnimalDto._links.individual.href);
        const staff = await this.getStaff(accessAnimalDto._links.staff.href);
        const self = accessAnimalDto._links.self.href;

        const parts = accessAnimalDto._links.self.href.split('/');
        const datePart = parts[parts.length - 1].split('_');
        const dateStart = datePart[datePart.length - 1];
    
        return { 
            dateStart,
            dateEnd,
            individual,
            staff,
            self,
        };
    }

    private async getIndividual(url: string): Promise<string> {
        const result = await this.client.get(`${url}`);
        return result.data.name as string;
    }

    private async getStaff(url: string): Promise<string> {
        const result = await this.client.get(`${url}`);
        return result.data.surname + ' ' + result.data.name + ' ' + result.data.middleName as string;
    }

    public async deleteAccessAnimal(url: string): Promise<string>{
        console.log('URL ' + url)
        const result = await this.client.delete(`${url}`);
        return result.data;
    }

    public createAccessAnimal = async(accessAnimal: AccessAnimalInput) => {
        try {
        const id: AccessAnimalId = new AccessAnimalId(
            accessAnimal.dateStart,
            accessAnimal.individual,
            accessAnimal.staff
        );

        const request: AccessAnimalRequest = new AccessAnimalRequest(
            accessAnimal.dateStart,
            accessAnimal.individual,
            accessAnimal.staff,
            id,
            accessAnimal.dateEnd
        );


        let response = await this.client.post(`${this.baseUrl}/access-animals`, request);
        if (response.data.dateEnd !== undefined) {
            return  'ok'
        } else {
            // @ts-ignore
            const responseBody = await response.text
            // @ts-ignore
            console.log('RESPONSE ' + response.text)
            const jsonResponse = JSON.parse(responseBody)
            return jsonResponse.message

        }
        } catch (error) {
            console.error('Произошла ошибка:', error)

            // @ts-ignore
            return error.response.data.message
        }
    }

    public update = async(accessAnimal: AccessAnimalInput, url: string) => {
        if (accessAnimal.dateEnd!== null) {
            const dateStart = new Date(accessAnimal.dateStart)
            const dateEnd = new Date(accessAnimal.dateEnd)
            const currentDate = new Date()

            if (dateStart >= dateEnd) return "Дата начала не может быть больше даты окончания"
            if (dateEnd > currentDate) return "Дата конца не может быть больше текущей даты"
        }
        
        try {
        const id: AccessAnimalId = new AccessAnimalId(
            accessAnimal.dateStart,
            accessAnimal.individual,
            accessAnimal.staff
        );

        const request: AccessAnimalRequest = new AccessAnimalRequest(
            accessAnimal.dateStart,
            accessAnimal.individual,
            accessAnimal.staff,
            id,
            accessAnimal.dateEnd
        );


        const response = await this.client.put(`${url}`, request);

        const parts = response.data._links.self.href.split('/');
        const datePart = parts[parts.length - 1].split('_');
        const dateStart = datePart[datePart.length - 1];

        const individualFromAccessAnimal = await this.getIndividual(accessAnimal.individual)
        const individualFromAnswer = await this.getIndividual(response.data._links.individual.href)

        const staffFromAccessAnimal = await this.getStaff(accessAnimal.staff)
        const staffFromAnswer = await this.getStaff(response.data._links.staff.href)

        if (response.data.dateEnd !== accessAnimal.dateEnd ||
            individualFromAccessAnimal !== individualFromAnswer||
            staffFromAccessAnimal !== staffFromAnswer ||
            dateStart !== accessAnimal.dateStart
            ) {
            return 'Ошибка: данные не обновились'
        }


        if (response.data.dateEnd !== undefined) {
            return  'ok'
        } else {
            // @ts-ignore
            const responseBody = await response.text
            // @ts-ignore
            console.log('RESPONSE ' + response.text)
            const jsonResponse = JSON.parse(responseBody)
            return jsonResponse.message

        }
        } catch (error) {
            console.error('Произошла ошибка:', error)

            // @ts-ignore
            return error.response.data.message
        }
    }
}
