import { AbstractService } from "../AbstractService";
import { OffspringFactor, OffspringFactorDto, EmbeddedDto, OffspringFactorInput, OffspringFactorRequest } from "./OffspringFactor.types";

export class OffspringFactorService extends AbstractService {
    public async getOffspringFactor(url: string): Promise<OffspringFactor> {
        const result = await this.client.get(url);
        const { ageStart, ageEnd } = result.data;
        const animal: string = await this.getAnimal(result.data._links.animal.href);
        const physicalState: string = await this.getPhysicalState(result.data._links.physicalState.href);
        return {
            animal,
            physicalState,
            ageStart,
            ageEnd,
            self: result.data._links.self.href,
        };
    }
    
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
                ageEnd,
                self: offspringFactorDto._links.self.href,
            };
        });
    
        return Promise.all(offspringFactorArray);
    }

    public async deleteOffspringFactor(url: string): Promise<string> {
        const result = await this.client.delete(url);
        return result.data;
    }

    public createOffspringFactor = async (offspringFactor: OffspringFactorInput): Promise<string> => {
       
        const dateValidationMessage = this.validateDates(offspringFactor.ageStart, offspringFactor.ageEnd);
        if (dateValidationMessage) return dateValidationMessage;
        

        try {
            const request = this.createOffspringFactorRequest(offspringFactor);
            const response = await this.client.post(`${this.baseUrl}/offspring-factors`, request);

            return response.data.ageStart!== undefined ? 'ok' : this.extractErrorMessage(response);
        } catch (error) {
            console.error('Произошла ошибка:', error);
            return this.extractErrorMessage(error);
        }
    }

    public update = async (OffspringFactor: OffspringFactorInput, url: string): Promise<string> => {
        this.deleteOffspringFactor(url)
        const code = await this.createOffspringFactor(OffspringFactor);
        return code
    }

    private validateDates(ageStart: number, ageEnd: number): string | null {
        if (ageStart > ageEnd) return "Возраст начала не может быть больше возраста конца";
        return null;
    }

    private createOffspringFactorRequest(offspringFactor: OffspringFactorInput): OffspringFactorRequest {
        return new OffspringFactorRequest(
            offspringFactor.animal,
            offspringFactor.physicalState,
            offspringFactor.ageStart,
            offspringFactor.ageEnd,
        );
    }

    private extractErrorMessage(response: any): string {
        // @ts-ignore
        const responseBody = response?.text ? response.text() : JSON.stringify(response);
        // @ts-ignore
        const jsonResponse = JSON.parse(responseBody);
        return jsonResponse.message || 'Произошла ошибка';
    }
}
