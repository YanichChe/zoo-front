import { AbstractService } from "../AbstractService";
import { FamilyRelationshipsDto, FamilyRelationships, EmbeddedDto, FamilyRelationshipsRequest, FamilyRelationshipsInput } from "./FamilyRelationship.types";

export class FamilyRelationshipsService extends AbstractService {

    public async getFamilyRelationships(url: string): Promise<FamilyRelationships> {
        const result = await this.client.get(url);
        return this.mapFamilyRelationshipsDto(result.data);
    }

    public async getList(): Promise<FamilyRelationships[]> {
        const result = await this.client.get(`${this.baseUrl}/family-relationships`);
        return this.mapFamilyRelationshipsArray(result.data);
    }

    private async mapFamilyRelationshipsArray(embeddedDto: EmbeddedDto): Promise<FamilyRelationships[]> {
        const { _embedded } = embeddedDto;
        if (!_embedded || !Array.isArray(_embedded['family-relationships'])) {
            return [];
        }

        const FamilyRelationshipsDtos: FamilyRelationshipsDto[] = _embedded['family-relationships'];

        const FamilyRelationshipss: Promise<FamilyRelationships>[] = FamilyRelationshipsDtos.map(async (dto) => this.mapFamilyRelationshipsDto(dto));
        return Promise.all(FamilyRelationshipss);
    }

    private async mapFamilyRelationshipsDto(dto: FamilyRelationshipsDto): Promise<FamilyRelationships> {
        const { _links } = dto;
        const individualId1 = await this.getIndividual(_links.individualId1.href);
        const individualId2 = await this.getIndividual(_links.individualId2.href);
        const typeRelationship = await this.getTypeRelationship(_links.typeRelationship.href);
        const self = _links.self.href;

        return { individualId1, individualId2, typeRelationship, self };
    }

    private async getIndividual(url: string): Promise<string> {
        const result = await this.client.get(url);
        return result.data.name;
    }

    private async getTypeRelationship(url: string): Promise<string> {
        const result = await this.client.get(url);
        return result.data.relationship;
    }

    public async deleteFamilyRelationships(url: string): Promise<string> {
        console.log(url)
        const result = await this.client.delete(url);
        return result.data;
    }

    public createFamilyRelationships = async (familyRelationships: FamilyRelationshipsInput): Promise<string> => {
    
        try {
            const request = this.createFamilyRelationshipsRequest(familyRelationships);
            const response = await this.client.post(`${this.baseUrl}/family-relationships`, request);

            return response.data._links.self !== undefined ? 'ok' : this.extractErrorMessage(response);
        } catch (error) {
            console.error('Произошла ошибка:', error);
            return this.extractErrorMessage(error);
        }
    }

    public update = async (familyRelationships: FamilyRelationshipsInput, url: string): Promise<string> => {
        this.deleteFamilyRelationships(url)
        const code = await this.createFamilyRelationships(familyRelationships);
        return code
    }

    private createFamilyRelationshipsRequest(familyRelationships: FamilyRelationshipsInput): FamilyRelationshipsRequest {
        return new FamilyRelationshipsRequest(familyRelationships.individualId1, familyRelationships.individualId2, familyRelationships.typeRelationship);
    }

    private extractErrorMessage(response: any): string {
        // @ts-ignore
        const responseBody = response?.text ? response.text() : JSON.stringify(response);
        // @ts-ignore
        const jsonResponse = JSON.parse(responseBody);
        return jsonResponse.message || 'Произошла ошибка';
    }
}
