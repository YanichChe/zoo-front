import { AbstractService } from "../AbstractService";
import { CellHistory, CellHistoryDto, CellHistoryInput, CellHistoryRequest, EmbeddedDto } from "./CellHistory.types";

export class CellHistoryService extends AbstractService {

    public async getCellHistory(url: string): Promise<CellHistory> {
        const result = await this.client.get(url);
        return this.mapCellHistoryDto(result.data);
    }


    public async getList(): Promise<CellHistory[]> {
        const result = await this.client.get(`${this.baseUrl}/cell-history`)
        const cellHistoryArray: CellHistory[] = await this.getCellHistoryArray(result.data);
        return cellHistoryArray
    }

    private async getIndividual(url: string): Promise<string> {
        const result = await this.client.get(`${url}`)
        return result.data.name as string
    }

    public async deleteCellHistory(url: string): Promise<string> {
        const result = await this.client.delete(url);
        return result.data;
    }

    public update = async (cellHistory: CellHistoryInput, url: string): Promise<string> => {
        if (cellHistory.dateEnd !== null) {
            const dateValidationMessage = this.validateDates(cellHistory.dateStart, cellHistory.dateEnd);
            if (dateValidationMessage) return dateValidationMessage;
        }
        
        const cellNumberValidationMessage = this.validateCellNumber(cellHistory.cellNumber);
        if (cellNumberValidationMessage) return cellNumberValidationMessage;

        try {
            const request = this.createCellHistoryRequest(cellHistory);
            const response = await this.client.put(url, request);

            const validationMessage = await this.validateResponseData(response.data, cellHistory);
            return validationMessage || (response.data.dateEnd ? 'ok' : this.extractErrorMessage(response));
        } catch (error) {
            console.error('Произошла ошибка:', error);
            return this.extractErrorMessage(error);
        }
    }

    public create = async (cellHistory: CellHistoryInput): Promise<string> => {
        if (cellHistory.dateEnd !== null) {
            const dateValidationMessage = this.validateDates(cellHistory.dateStart, cellHistory.dateEnd);
            if (dateValidationMessage) return dateValidationMessage;
        }

        try {
            const request = this.createCellHistoryRequest(cellHistory);
            const response = await this.client.post(`${this.baseUrl}/cell-history`, request);

            return response.data.dateEnd ? 'ok' : this.extractErrorMessage(response);
        } catch (error) {
            console.error('Произошла ошибка:', error);
            return this.extractErrorMessage(error);
        }
    }

    private async validateResponseData(responseData: CellHistoryDto, cellHistory: CellHistoryInput): Promise<string | null> {
        const { dateEnd, dateStart, _links } = responseData;
        const individual = await this.getIndividual(_links.individual.href);

        if (dateEnd !== cellHistory.dateEnd ||
            individual !== await this.getIndividual(cellHistory.individual) ||
            dateStart !== cellHistory.dateStart) {
            return 'Ошибка: данные не обновились';
        }
        return null;
    }

    private extractErrorMessage(response: any): string {
        // @ts-ignore
        const responseBody = response?.text ? response.text() : JSON.stringify(response);
        // @ts-ignore
        const jsonResponse = JSON.parse(responseBody);
        return jsonResponse.message || 'Произошла ошибка';
    }
    
    private createCellHistoryRequest(cellHistory: CellHistoryInput): CellHistoryRequest {
        return new CellHistoryRequest(cellHistory.dateStart, cellHistory.individual, cellHistory.cellNumber, cellHistory.dateEnd,);
    }

    private validateDates(dateStart: string, dateEnd: string): string | null {
        const startDate = new Date(dateStart);
        const endDate = new Date(dateEnd);
        const currentDate = new Date();

        if (startDate > endDate) return "Дата начала не может быть больше даты окончания";
        if (endDate > currentDate) return "Дата конца не может быть больше текущей даты";
        return null;
    }

    private validateCellNumber(cellNumber: number): string | null {
        if (cellNumber <= 0) return "Значение клетки целое положительное число";
        return null;
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
            const self = cellHistoryDto._links.self.href;
            return {
                dateStart,
                dateEnd,
                cellNumber,
                individualName,
                self
            };
        });
    
        return Promise.all(cellHistoryArray);
    }

    private async mapCellHistoryDto(cellHistoryDto: CellHistoryDto): Promise<CellHistory> {
        const { dateStart, dateEnd, cellNumber } = cellHistoryDto;
            const individualName: string = await this.getIndividual(cellHistoryDto._links.individual.href);
            const self = cellHistoryDto._links.self.href;
            return {
                dateStart,
                dateEnd,
                cellNumber,
                individualName,
                self
            };
    }

}
