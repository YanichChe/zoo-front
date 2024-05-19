import { AbstractService } from "../AbstractService";
import { Zoo, ZooDto, EmbeddedDto } from "./Zoo.types";

export class ZooService extends AbstractService {
    public async getList(): Promise<Zoo[]> {
        const result = await this.client.get(`${this.baseUrl}/zoos`);
        const zooArray: Zoo[] = await this.getZooArray(result.data);
        return zooArray;
    }

    private async getZooArray(embeddedDto: EmbeddedDto): Promise<Zoo[]> {
        const { _embedded } = embeddedDto;
        if (!_embedded || !(_embedded['zoos'] instanceof Array)) {
            return [];
        }
    
        const zooDtos: ZooDto[] = _embedded['zoos'];

        const zooArray: Promise<Zoo>[] = zooDtos.map(async (zoo: ZooDto) => {
            const { name } = zoo;
            const self: string = zoo._links.self.href
            return {
                name, 
                self
            };
        })

        return Promise.all(zooArray);
    }
}
