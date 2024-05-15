import { AbstractService } from "../AbstractService";
import { ResponsibleAnimalDto, ResponseAnimal, EmbeddedDto } from "./ResponsibleAnimal.types";

export class ResponseAnimalService extends AbstractService {
    public async getList(): Promise<ResponseAnimal[]> {
        const result = await this.client.get(`${this.baseUrl}/response-animal`);
        const prohibitedCombinationsSettlementArray: ResponseAnimal[] = await this.getAccessAnimalArray(result.data);
        return prohibitedCombinationsSettlementArray;
    }

    private async getAccessAnimalArray(embeddedDto: EmbeddedDto): Promise<ResponseAnimal[]> {
        const { _embedded } = embeddedDto;
        if (!_embedded || !(_embedded['response-animal'] instanceof Array)) {
            return [];
        }
    
        const accessAnimalDtos: ResponsibleAnimalDto[] = _embedded['response-animal'];
    
        const accessAnimalArray: Promise<ResponseAnimal>[] = accessAnimalDtos.map(async (accessAnimalDto: ResponsibleAnimalDto) => {
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
        return result.data.name as string;
    }

    private async getStaff(url: string): Promise<string> {
        const result = await this.client.get(`${url}`);
        return result.data.middleName + ' ' + result.data.name + ' ' + result.data.surname as string;
    }
}
