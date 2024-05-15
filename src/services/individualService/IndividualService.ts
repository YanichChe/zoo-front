import { AbstractService } from "../AbstractService";
import { IndividualDto, Individual, EmbeddedDto } from "./Individual.types";

export class IndividualService extends AbstractService {
    public async getList(): Promise<Individual[]> {
        const result = await this.client.get(`${this.baseUrl}/individuals`);
        const IndividualArray: Individual[] = await this.getIndividualArray(result.data);
        console.log(IndividualArray)
        return IndividualArray;
    }

    private async getIndividualArray(embeddedDto: EmbeddedDto): Promise<Individual[]> {
        const { _embedded } = embeddedDto;
        if (!_embedded || !(_embedded['individuals'] instanceof Array)) {
            return [];
        }
    
        const IndividualDtos: IndividualDto[] = _embedded['individuals'];
    
        const IndividualArray: Promise<Individual>[] = IndividualDtos.map(async (IndividualDto: IndividualDto) => {
            const { name } = IndividualDto;
            const self: string = IndividualDto._links.self.href;
            return { 
                name,
                self,
            };
        });
    
        return Promise.all(IndividualArray);
    }
}
