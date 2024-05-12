import { AbstractService } from "../AbstractService";
import { Zoo, ZooDto, EmbeddedDto } from "./Zoo.types";

export class ZooService extends AbstractService {
    public async getList(): Promise<Zoo[]> {
        const result = await this.client.get(`${this.baseUrl}/zoos`);
        const zooArray: Zoo[] = this.getZooArray(result.data);
        return zooArray;
    }

    private getZooArray(embeddedDto: EmbeddedDto): Zoo[] {
        const { _embedded } = embeddedDto;
        if (!_embedded || !(_embedded['zoos'] instanceof Array)) {
            return [];
        }
    
        const zooDtos: ZooDto[] = _embedded['zoos'];
        return zooDtos.map((zooDto: ZooDto) => ({
            name: zooDto.name,
        }));
    }
}
