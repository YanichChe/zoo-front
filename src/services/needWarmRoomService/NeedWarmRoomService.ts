import { AbstractService } from "../AbstractService";
import { NeedWarmRoom, NeedWarmRoomDto, EmbeddedDto } from "./NeedWarmRoom.types";

export class NeedWarmRoomService extends AbstractService {
    public async getList(): Promise<NeedWarmRoom[]> {
        const result = await this.client.get(`${this.baseUrl}/need-warm-room`);
        const needWarmRoomArray: NeedWarmRoom[] = await this.getNeedWarmRoomArray(result.data);
        return needWarmRoomArray;
    }

    private async getNeedWarmRoomArray(embeddedDto: EmbeddedDto): Promise<NeedWarmRoom[]> {
        const { _embedded } = embeddedDto;
        if (!_embedded || !(_embedded['need-warm-room'] instanceof Array)) {
            return [];
        }

        const needWarmRoomDtos: NeedWarmRoomDto[] = _embedded['need-warm-room'];

        return needWarmRoomDtos.map((needWarmRoomDto: NeedWarmRoomDto) => {
            const { rowNum, individualName, animalTitle, age } = needWarmRoomDto;
            return { rowNum, individualName, animalTitle, age };
        });
    }
}
