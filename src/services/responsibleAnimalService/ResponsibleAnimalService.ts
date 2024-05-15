import { AbstractService } from "../AbstractService";
import { ResponsibleAnimalDto, ResponseAnimal, EmbeddedDto, ResponseAnimalId, ResponseAnimalRequest } from "./ResponsibleAnimal.types";

export class ResponseAnimalService extends AbstractService {
    public async getList(): Promise<ResponseAnimal[]> {
        const result = await this.client.get(`${this.baseUrl}/response-animal`);
        const prohibitedCombinationsSettlementArray: ResponseAnimal[] = await this.getResponseAnimalArray(result.data);
        return prohibitedCombinationsSettlementArray;
    }

    private async getResponseAnimalArray(embeddedDto: EmbeddedDto): Promise<ResponseAnimal[]> {
        const { _embedded } = embeddedDto;
        if (!_embedded || !(_embedded['response-animal'] instanceof Array)) {
            return [];
        }
    
        const ResponseAnimalDtos: ResponsibleAnimalDto[] = _embedded['response-animal'];
    
        const ResponseAnimalArray: Promise<ResponseAnimal>[] = ResponseAnimalDtos.map(async (ResponseAnimalDto: ResponsibleAnimalDto) => {
            const {dateStart, dateEnd} = ResponseAnimalDto;
            const individual: string = await this.getIndividual(ResponseAnimalDto._links.individual.href);
            const staff = await this.getStaff(ResponseAnimalDto._links.staff.href);
       
            return { 
                dateStart,
                dateEnd,
                individual,
                staff,
            };
        });
    
        return Promise.all(ResponseAnimalArray);
    }

    private async getIndividual(url: string): Promise<string> {
        const result = await this.client.get(`${url}`);
        return result.data.name as string;
    }

    private async getStaff(url: string): Promise<string> {
        const result = await this.client.get(`${url}`);
        return result.data.middleName + ' ' + result.data.name + ' ' + result.data.surname as string;
    }

    public createResponseAnimal = async(ResponseAnimal: ResponseAnimal) => {
        try {
        const id: ResponseAnimalId = new ResponseAnimalId(
            ResponseAnimal.dateStart,
            ResponseAnimal.individual,
            ResponseAnimal.staff
        );

        const request: ResponseAnimalRequest = new ResponseAnimalRequest(
            ResponseAnimal.dateStart,
            ResponseAnimal.individual,
            ResponseAnimal.staff,
            id
        );


        let response = await this.client.post(`${this.baseUrl}/response-animal`, request);
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
