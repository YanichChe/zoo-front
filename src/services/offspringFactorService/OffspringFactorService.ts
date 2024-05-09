import { AbstractService } from "../AbstractService";
import { OffspringFactor, OffspringFactorDto, EmbeddedDto } from "./OffspringFactor.types";

export class OffspringFactorService extends AbstractService {
    public async getList(): Promise<OffspringFactor[]> {
        const result = await this.client.get(`${this.baseUrl}/offspring-factors`);
        const offspringFactorArray: OffspringFactor[] = await this.getOffspringFactorArray(result.data);
        return offspringFactorArray;
    }

    private async getAnimal(url: string): Promise<string> {
        const result = await this.client.get(`${url}`);
        return result.data.animalTitle as string;
    }

    private async getPhysicalState(url: string): Promise<string> {
        const result = await this.client.get(`${url}`);
        return result.data.state as string;
    }

    private async getOffspringFactorArray(embeddedDto: EmbeddedDto): Promise<OffspringFactor[]> {
        const { _embedded } = embeddedDto;
        if (!_embedded || !(_embedded['offspring-factors'] instanceof Array)) {
            return [];
        }
    
        const offspringFactorDtos: OffspringFactorDto[] = _embedded['offspring-factors'];
    
        const offspringFactorArray: Promise<OffspringFactor>[] = offspringFactorDtos.map(async (offspringFactorDto: OffspringFactorDto) => {
            const { ageStart, ageEnd } = offspringFactorDto;
            const animal: string = await this.getAnimal(offspringFactorDto._links.animal.href);
            const physicalState: string = await this.getPhysicalState(offspringFactorDto._links.physicalState.href);
            return {
                animal,
                physicalState,
                ageStart,
                ageEnd
            };
        });
    
        return Promise.all(offspringFactorArray);
    }
}
