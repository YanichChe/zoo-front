import { AbstractService } from "../AbstractService";
import { TypeRelationship, TypeRelationshipDto, EmbeddedDto } from "./TypeRelationship.types";

export class TypeRelationshipService extends AbstractService {
    public async getList(): Promise<TypeRelationship[]> {
        const result = await this.client.get(`${this.baseUrl}/type-relationships`);
        const typeRelationshipArray: TypeRelationship[] = this.getTypeRelationshipArray(result.data);
        return typeRelationshipArray;
    }

    private getTypeRelationshipArray(embeddedDto: EmbeddedDto): TypeRelationship[] {
        const { _embedded } = embeddedDto;
        if (!_embedded || !(_embedded['type-relationships'] instanceof Array)) {
            return [];
        }
    
        const typeRelationshipDtos: TypeRelationshipDto[] = _embedded['type-relationships'];
        return typeRelationshipDtos.map((typeRelationshipDto: TypeRelationshipDto) => ({
            relationship: typeRelationshipDto.relationship,
        }));
    }
}
