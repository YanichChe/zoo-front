import { AbstractService } from "../AbstractService";
import { Dimension, DimensionDto, EmbeddedDto } from "./Dimension.types";

export class DimensionService extends AbstractService {
    public async getList(): Promise<Dimension[]> {
        const result = await this.client.get(`${this.baseUrl}/dimensions`);
        const dimensionArray: Dimension[] = await this.getDimensionArray(result.data);
        return dimensionArray;
    }

    private async getDimensionArray(embeddedDto: EmbeddedDto): Promise<Dimension[]> {
        const { _embedded } = embeddedDto;
        if (!_embedded || !(_embedded['dimensions'] instanceof Array)) {
            return [];
        }
    
        const dimensionDtos: DimensionDto[] = _embedded['dimensions'];
    
        const dimensionArray: Dimension[] = dimensionDtos.map((dimensionDto: DimensionDto) => {
            return {
                dimension: dimensionDto.dimension,
                self: dimensionDto._links.self.href,
            };
        });
    
        return dimensionArray;
    }
}
