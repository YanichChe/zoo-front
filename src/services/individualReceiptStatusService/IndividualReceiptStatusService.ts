import { AbstractService } from "../AbstractService";
import { IndividualReceiptStatus, IndividualReceiptStatusDto, EmbeddedDto } from "./IndividualReceiptStatus.types";

export class IndividualReceiptStatusService extends AbstractService {
    public async getList(): Promise<IndividualReceiptStatus[]> {
        const result = await this.client.get(`${this.baseUrl}/individual-receipt-status`);
        const individualReceiptStatusArray: IndividualReceiptStatus[] = await this.getIndividualReceiptStatusArray(result.data);
        return individualReceiptStatusArray;
    }

    private async getIndividualReceiptStatusArray(embeddedDto: EmbeddedDto): Promise<IndividualReceiptStatus[]> {
        const { _embedded } = embeddedDto;
        if (!_embedded || !(_embedded['individual-receipt-status'] instanceof Array)) {
            return [];
        }
    
        const individualReceiptStatusDtos: IndividualReceiptStatusDto[] = _embedded['individual-receipt-status'];
    
        const individualReceiptStatusArray: IndividualReceiptStatus[] = individualReceiptStatusDtos.map((individualReceiptStatusDto: IndividualReceiptStatusDto) => {
            return {
                statusName: individualReceiptStatusDto.statusName,
                self: individualReceiptStatusDto._links.self.href,
            };
        });
    
        return individualReceiptStatusArray;
    }
}
