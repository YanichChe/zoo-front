import { AbstractService } from "../AbstractService";
import { FamilyRelationship, FamilyRelationshipDto, EmbeddedDto } from "./FamilyRelationship.types";

export class FamilyRelationshipService extends AbstractService {
    public async getList(): Promise<FamilyRelationship[]> {
        const result = await this.client.get(`${this.baseUrl}/family-relationships`);
        const familyRelationshipArray: FamilyRelationship[] = await this.getFamilyRelationshipArray(result.data);
        return familyRelationshipArray;
    }

    private async getIndividual(url: string): Promise<string> {
        const result = await this.client.get(`${url}`);
        return result.data.name as string;
    }

    private async getTypeRelationship(url: string): Promise<string> {
        const result = await this.client.get(`${url}`);
        return result.data.relationship as string;
    }

    private async getFamilyRelationshipArray(embeddedDto: EmbeddedDto): Promise<FamilyRelationship[]> {
        const { _embedded } = embeddedDto;
        if (!_embedded || !(_embedded['family-relationships'] instanceof Array)) {
            return [];
        }
    
        const familyRelationshipDtos: FamilyRelationshipDto[] = _embedded['family-relationships'];
    
        const familyRelationshipArray: Promise<FamilyRelationship>[] = familyRelationshipDtos.map(async (familyRelationshipDto: FamilyRelationshipDto) => {
            const { individual_id_1, individual_id_2 } = familyRelationshipDto;
            const individual1: string = await this.getIndividual(individual_id_1.href);
            const individual2: string = await this.getIndividual(individual_id_2.href);
            const typeRelationship: string = await this.getTypeRelationship(familyRelationshipDto._links.type_relationship.href);
            return {
                individual1,
                individual2,
                typeRelationship
            };
        });
    
        return Promise.all(familyRelationshipArray);
    }
}
