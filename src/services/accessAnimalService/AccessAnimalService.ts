import { AbstractService } from "../AbstractService";
import { AccessAnimalDto, AccessAnimal, EmbeddedDto, AccessAnimalId, AccessAnimalRequest } from "./AccessAnimal.types";

export class AccessAnimalService extends AbstractService {
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
            const {dateStart, dateEnd} = accessAnimalDto;
            const individual: string = await this.getIndividual(accessAnimalDto._links.individual.href);
            const staff = await this.getStaff(accessAnimalDto._links.staff.href);
       
            return { 
                dateStart,
                dateEnd,
                individual,
                staff,
            };
        });
    
        return Promise.all(accessAnimalArray);
    }

    private async getIndividual(url: string): Promise<string> {
        const result = await this.client.get(`${url}`);
        console.log(result.data.name);
        return result.data.name as string;
    }

    private async getStaff(url: string): Promise<string> {
        const result = await this.client.get(`${url}`);
        return result.data.middleName + ' ' + result.data.name + ' ' + result.data.surname as string;
    }

    public createAccessAnimal = async(accessAnimal: AccessAnimal) => {
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
            id
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
}
