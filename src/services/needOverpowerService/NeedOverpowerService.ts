import { AbstractService } from "../AbstractService";
import { NeedOverpower, NeedOverpowerDto, EmbeddedDto } from "./NeedOverpower.types";

export class NeedOverpowerService extends AbstractService {
    public async getList(): Promise<NeedOverpower[]> {
        const result = await this.client.get(`${this.baseUrl}/need-overpower`);
        const needOverpowerArray: NeedOverpower[] = await this.getNeedOverpowerArray(result.data);
        return needOverpowerArray;
    }

    private async getNeedOverpowerArray(embeddedDto: EmbeddedDto): Promise<NeedOverpower[]> {
        const { _embedded } = embeddedDto;
        if (!_embedded || !(_embedded['need-overpower'] instanceof Array)) {
            return [];
        }

        const needOverpowerDtos: NeedOverpowerDto[] = _embedded['need-overpower'];

        return needOverpowerDtos.map((needOverpowerDto: NeedOverpowerDto) => {
            const { rowNum, name1, animalTitle1, name2, animalTitle2, cellNumber1, cellNumber2 } = needOverpowerDto;
            return { rowNum, name1, animalTitle1, name2, animalTitle2, cellNumber1, cellNumber2 };
        });
    }
}
