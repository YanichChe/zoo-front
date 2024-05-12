import { AbstractService } from "../AbstractService";
import { ProhibitedCombinationsSettlement, ProhibitedCombinationsSettlementDto, EmbeddedDto } from "./Prohibited.types";

export class ProhibitedCombinationsSettlementService extends AbstractService {
    public async getList(): Promise<ProhibitedCombinationsSettlement[]> {
        const result = await this.client.get(`${this.baseUrl}/prohibited-combination`);
        const prohibitedCombinationsSettlementArray: ProhibitedCombinationsSettlement[] = await this.getProhibitedCombinationsSettlementArray(result.data);
        return prohibitedCombinationsSettlementArray;
    }

    private async getProhibitedCombinationsSettlementArray(embeddedDto: EmbeddedDto): Promise<ProhibitedCombinationsSettlement[]> {
        const { _embedded } = embeddedDto;
        if (!_embedded || !(_embedded['prohibited-combination'] instanceof Array)) {
            return [];
        }
    
        const prohibitedCombinationsSettlementDtos: ProhibitedCombinationsSettlementDto[] = _embedded['prohibited-combination'];
    
        const prohibitedCombinationsSettlementArray: Promise<ProhibitedCombinationsSettlement>[] = prohibitedCombinationsSettlementDtos.map(async (prohibitedCombinationsSettlementDto: ProhibitedCombinationsSettlementDto) => {
            const animalId1: string = await this.getAnimalId(prohibitedCombinationsSettlementDto._links.animalId1.href);
            const animalId2: string = await this.getAnimalId(prohibitedCombinationsSettlementDto._links.animalId2.href);
            return { animalId1, animalId2 };
        });
    
        return Promise.all(prohibitedCombinationsSettlementArray);
    }

    private async getAnimalId(url: string): Promise<string> {
        const result = await this.client.get(`${url}`);
        return result.data.animalTitle as string;
    }
}
