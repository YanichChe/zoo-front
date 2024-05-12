import { AbstractService } from "../AbstractService";
import { NutritionType, NutritionTypeDto, EmbeddedDto } from "./NutrititionType.types";

export class NutritionTypeService extends AbstractService {
    public async getList(): Promise<NutritionType[]> {
        const result = await this.client.get(`${this.baseUrl}/nutrition-types`);
        const nutritionTypeArray: NutritionType[] = this.getNutritionTypeArray(result.data);
        return nutritionTypeArray;
    }

    private getNutritionTypeArray(embeddedDto: EmbeddedDto): NutritionType[] {
        const { _embedded } = embeddedDto;
        if (!_embedded || !(_embedded['nutrition-types'] instanceof Array)) {
            return [];
        }
    
        const nutritionTypeDtos: NutritionTypeDto[] = _embedded['nutrition-types'];
        return nutritionTypeDtos.map((nutritionTypeDto: NutritionTypeDto) => ({
            type: nutritionTypeDto.type,
        }));
    }
}
