import { AbstractService } from "../AbstractService";
import { Season, SeasonDto, EmbeddedDto } from "./Season.types";

export class SeasonService extends AbstractService {
    public async getList(): Promise<Season[]> {
        const result = await this.client.get(`${this.baseUrl}/seasons`);
        const seasonArray: Season[] = this.getSeasonArray(result.data);
        return seasonArray;
    }

    private getSeasonArray(embeddedDto: EmbeddedDto): Season[] {
        const { _embedded } = embeddedDto;
        if (!_embedded || !(_embedded['seasons'] instanceof Array)) {
            return [];
        }
    
        const seasonDtos: SeasonDto[] = _embedded['seasons'];
        return seasonDtos.map((seasonDto: SeasonDto) => ({
            season: seasonDto.season,
        }));
    }
}
