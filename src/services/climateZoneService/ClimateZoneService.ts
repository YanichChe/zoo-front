import { AbstractService } from "../AbstractService";
import { ClimateZone, ClimateZoneDto, EmbeddedDto } from "./ClimateZone.types";

export class ClimateZoneService extends AbstractService {
    public async getList(): Promise<ClimateZone[]> {
        const result = await this.client.get(`${this.baseUrl}/climate-zones`);
        const climateZoneArray: ClimateZone[] = await this.getClimateZoneArray(result.data);
        return climateZoneArray;
    }

    private async getClimateZoneArray(embeddedDto: EmbeddedDto): Promise<ClimateZone[]> {
        const { _embedded } = embeddedDto;
        if (!_embedded || !(_embedded['climate-zones'] instanceof Array)) {
            return [];
        }
    
        const climateZoneDtos: ClimateZoneDto[] = _embedded['climate-zones'];
    
        const climateZoneArray: ClimateZone[] = climateZoneDtos.map((climateZoneDto: ClimateZoneDto) => {
            return {
                isColdTolerance: climateZoneDto.isColdTolerance,
                climateZoneName: climateZoneDto.climateZoneName
            };
        });
    
        return climateZoneArray;
    }
}
