import { AbstractService } from "../AbstractService";
import { CellHistory, CellHistoryDto, EmbeddedDto } from "./CellHistory.types";

export class CellHistoryService extends AbstractService {
    public async getList(): Promise<CellHistory[]> {
        const result = await this.client.get(`${this.baseUrl}/cell-history`)
        const cellHistoryArray: CellHistory[] = await this.getCellHistoryArray(result.data);
        return cellHistoryArray
    }

    private async getIndividual(url: string): Promise<string> {
        const result = await this.client.get(`${url}`)
        return result.data.name as string
    }

    private async getCellHistoryArray(embeddedDto: EmbeddedDto): Promise<CellHistory[]> {
        const { _embedded } = embeddedDto;
        if (!_embedded || !(_embedded['cell-history'] instanceof Array)) {
            return [];
        }
    
        const cellHistoryDtos: CellHistoryDto[] = _embedded['cell-history'];
    
        const cellHistoryArray: Promise<CellHistory>[] = cellHistoryDtos.map(async (cellHistoryDto: CellHistoryDto) => {
            const { dateStart, dateEnd, cellNumber } = cellHistoryDto;
            const individualName: string = await this.getIndividual(cellHistoryDto._links.individual.href);
            return {
                dateStart,
                dateEnd,
                cellNumber,
                individualName
            };
        });
    
        return Promise.all(cellHistoryArray);
    }
}
