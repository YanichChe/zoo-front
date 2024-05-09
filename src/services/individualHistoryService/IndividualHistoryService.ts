import { AbstractService } from "../AbstractService";
import { IndividualHistory, IndividualHistoryDto, EmbeddedDto } from "./IndividualHistory.types";

export class IndividualHistoryService extends AbstractService {
    public async getList(): Promise<IndividualHistory[]> {
        const result = await this.client.get(`${this.baseUrl}/individual-history`);
        const individualHistoryArray: IndividualHistory[] = await this.getIndividualHistoryArray(result.data);
        return individualHistoryArray;
    }

    private async getIndividual(url: string): Promise<string> {
        const result = await this.client.get(`${url}`);
        return result.data.name as string;
    }

    private async getIndividualStatus(url: string): Promise<string> {
        const result = await this.client.get(`${url}`);
        return result.data.statusName as string;
    }

    private async getZoo(url: string): Promise<string> {
        const result = await this.client.get(`${url}`);
        return result.data.name as string;
    }

    private async getIndividualHistoryArray(embeddedDto: EmbeddedDto): Promise<IndividualHistory[]> {
        const { _embedded } = embeddedDto;
        if (!_embedded || !(_embedded['individual-history'] instanceof Array)) {
            return [];
        }
    
        const individualHistoryDtos: IndividualHistoryDto[] = _embedded['individual-history'];
    
        const individualHistoryArray: Promise<IndividualHistory>[] = individualHistoryDtos.map(async (individualHistoryDto: IndividualHistoryDto) => {
            const { receiptDate } = individualHistoryDto;
            const individual: string = await this.getIndividual(individualHistoryDto._links.individual.href);
            const individualStatus: string = await this.getIndividualStatus(individualHistoryDto._links.individualStatus.href);
            const zoo: string = await this.getZoo(individualHistoryDto._links.zoo.href);
            return {
                receiptDate,
                individual,
                individualStatus,
                zoo
            };
        });
    
        return Promise.all(individualHistoryArray);
    }
}
