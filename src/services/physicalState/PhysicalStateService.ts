import { AbstractService } from "../AbstractService";
import { EmbeddedDto, PhysicalState, PhysicalStateDto } from "./PhysicalState.types";

export class PhysicalStateService extends AbstractService {
    public async getList(): Promise<PhysicalState[]> {
        const result = await this.client.get(`${this.baseUrl}/physical-state`);
        const nutritionTypeArray: PhysicalState[] = this.getPhysicalStateArray(result.data);
        return nutritionTypeArray;
    }

    private getPhysicalStateArray(embeddedDto: EmbeddedDto): PhysicalState[] {
        const { _embedded } = embeddedDto;
        if (!_embedded || !(_embedded['physical-state'] instanceof Array)) {
            return [];
        }
    
        const physicalStateDtos: PhysicalStateDto[] = _embedded['physical-state'];
        return physicalStateDtos.map((physicalStateDto: PhysicalStateDto) => ({
            state: physicalStateDto.state,
            self: physicalStateDto._links.self.href,
        }));
    }
}
