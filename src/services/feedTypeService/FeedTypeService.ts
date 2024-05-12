import { AbstractService } from "../AbstractService";
import { FeedType, FeedTypeDto, EmbeddedDto } from "./FeedType.types";

export class FeedTypeService extends AbstractService {
    public async getList(): Promise<FeedType[]> {
        const result = await this.client.get(`${this.baseUrl}/feed-types`);
        const feedTypeArray: FeedType[] = await this.getFeedTypeArray(result.data);
        return feedTypeArray;
    }

    private async getFeedTypeArray(embeddedDto: EmbeddedDto): Promise<FeedType[]> {
        const { _embedded } = embeddedDto;
        if (!_embedded || !(_embedded['feed-types'] instanceof Array)) {
            return [];
        }
    
        const feedTypeDtos: FeedTypeDto[] = _embedded['feed-types'];
    
        const feedTypeArray: FeedType[] = feedTypeDtos.map((feedTypeDto: FeedTypeDto) => {
            return {
                type: feedTypeDto.type
            };
        });
    
        return feedTypeArray;
    }
}
