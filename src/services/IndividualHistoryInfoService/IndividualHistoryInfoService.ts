import { AbstractService } from "../AbstractService";
import { IndividualHistoryInfo, IndividualHistoryInfoDto, EmbeddedDto } from "./IndividualHistoryInfo.types";

export class IndividualHistoryInfoService extends AbstractService {
    public async getList(): Promise<IndividualHistoryInfo[]> {
        const result = await this.client.get(`${this.baseUrl}/individual-history-info`);
        const individualHistoryInfoArray: IndividualHistoryInfo[] = await this.getIndividualHistoryInfoArray(result.data);
        return individualHistoryInfoArray;
    }

    private async getIndividualHistoryInfoArray(embeddedDto: EmbeddedDto): Promise<IndividualHistoryInfo[]> {
        const { _embedded } = embeddedDto;
        if (!_embedded || !(_embedded['individual-history-info'] instanceof Array)) {
            return [];
        }

        const individualHistoryInfoDtos: IndividualHistoryInfoDto[] = _embedded['individual-history-info'];

        return individualHistoryInfoDtos.map((individualHistoryInfoDto: IndividualHistoryInfoDto) => {
            const { rowNum, receiptDate, zooName, statusName } = individualHistoryInfoDto;
            return { rowNum, receiptDate, zooName, statusName };
        });
    }
}
