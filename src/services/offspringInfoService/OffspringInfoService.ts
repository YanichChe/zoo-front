import { AbstractService } from "../AbstractService";
import { OffspringInfo, OffspringInfoDto, EmbeddedDto } from "./OffspringInfo.types";

export class OffspringInfoService extends AbstractService {
    public async getList(): Promise<OffspringInfo[]> {
        const result = await this.client.get(`${this.baseUrl}/offspring-info`);
        const offspringInfoArray: OffspringInfo[] = await this.getOffspringInfoArray(result.data);
        return offspringInfoArray;
    }

    private async getOffspringInfoArray(embeddedDto: EmbeddedDto): Promise<OffspringInfo[]> {
        const { _embedded } = embeddedDto;
        if (!_embedded || !(_embedded['offspring-info'] instanceof Array)) {
            return [];
        }

        const offspringInfoDtos: OffspringInfoDto[] = _embedded['offspring-info'];

        return offspringInfoDtos.map((offspringInfoDto: OffspringInfoDto) => {
            const { rowNum, name, animalTitle, age, ageStart, ageEnd, state } = offspringInfoDto;
            return { rowNum, name, animalTitle, age, ageStart, ageEnd, state };
        });
    }
}
