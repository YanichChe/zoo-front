import { AbstractService } from "../AbstractService";
import { CompatibleTypes, CompatibleTypesDto, EmbeddedDto } from "./CompatibleTypes.types";

export class CompatibleTypesService extends AbstractService {
    public async getList(): Promise<CompatibleTypes[]> {
        const result = await this.client.get(`${this.baseUrl}/compatible-type`);
        const compatibleTypesArray: CompatibleTypes[] = await this.getCompatibleTypesArray(result.data);
        return compatibleTypesArray;
    }

    private async getCompatibleTypesArray(embeddedDto: EmbeddedDto): Promise<CompatibleTypes[]> {
        const { _embedded } = embeddedDto;
        if (!_embedded || !(_embedded['compatible-type'] instanceof Array)) {
            return [];
        }

        const compatibleTypesDtos: CompatibleTypesDto[] = _embedded['compatible-type'];

        return compatibleTypesDtos.map((compatibleTypesDto: CompatibleTypesDto) => {
            const { rowNum, aanimalTitle, banimalTitle } = compatibleTypesDto;
            return { rowNum, aanimalTitle, banimalTitle };
        });
    }
}
