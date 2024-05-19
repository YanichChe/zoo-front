import { AbstractService } from "../AbstractService";
import { AccessAnimalDto, AccessAnimal, EmbeddedDto, AccessAnimalId, AccessAnimalRequest, AccessAnimalInput } from "./AccessAnimal.types";

export class AccessAnimalService extends AbstractService {

    public async getAccessAnimal(url: string): Promise<AccessAnimal> {
        const result = await this.client.get(url);
        return this.mapAccessAnimalDto(result.data);
    }

    public async getList(): Promise<AccessAnimal[]> {
        const result = await this.client.get(`${this.baseUrl}/access-animals`);
        return this.mapAccessAnimalArray(result.data);
    }

    private async mapAccessAnimalArray(embeddedDto: EmbeddedDto): Promise<AccessAnimal[]> {
        const { _embedded } = embeddedDto;
        if (!_embedded || !Array.isArray(_embedded['access-animals'])) {
            return [];
        }

        const accessAnimalDtos: AccessAnimalDto[] = _embedded['access-animals'];

        const accessAnimals: Promise<AccessAnimal>[] = accessAnimalDtos.map(async (dto) => this.mapAccessAnimalDto(dto));
        return Promise.all(accessAnimals);
    }

    private async mapAccessAnimalDto(dto: AccessAnimalDto): Promise<AccessAnimal> {
        const { dateEnd, _links } = dto;
        const individual = await this.getIndividual(_links.individual.href);
        const staff = await this.getStaff(_links.staff.href);
        const self = _links.self.href;

        const dateStart = this.extractDateFromUrl(self);

        return { dateStart, dateEnd, individual, staff, self };
    }

    private extractDateFromUrl(url: string): string {
        const parts = url.split('/');
        const datePart = parts[parts.length - 1].split('_');
        return datePart[datePart.length - 1];
    }

    private async getIndividual(url: string): Promise<string> {
        const result = await this.client.get(url);
        return result.data.name;
    }

    private async getStaff(url: string): Promise<string> {
        const result = await this.client.get(url);
        const { surname, name, middleName } = result.data;
        return `${surname} ${name} ${middleName}`;
    }

    public async deleteAccessAnimal(url: string): Promise<string> {
        const result = await this.client.delete(url);
        return result.data;
    }

    public createAccessAnimal = async (accessAnimal: AccessAnimalInput): Promise<string> => {
        if (accessAnimal.dateEnd !== null) {
            const dateValidationMessage = this.validateDates(accessAnimal.dateStart, accessAnimal.dateEnd);
            if (dateValidationMessage) return dateValidationMessage;
        }

        try {
            const request = this.createAccessAnimalRequest(accessAnimal);
            const response = await this.client.post(`${this.baseUrl}/access-animals`, request);

            return response.data.dateEnd!== undefined ? 'ok' : this.extractErrorMessage(response);
        } catch (error) {
            console.error('Произошла ошибка:', error);
            return this.extractErrorMessage(error);
        }
    }

    public update = async (accessAnimal: AccessAnimalInput, url: string): Promise<string> => {
        this.deleteAccessAnimal(url)
        const code = await this.createAccessAnimal(accessAnimal);
        return code
    }

    private validateDates(dateStart: string, dateEnd: string): string | null {
        const startDate = new Date(dateStart);
        const endDate = new Date(dateEnd);
        const currentDate = new Date();

        if (startDate > endDate) return "Дата начала не может быть больше даты окончания";
        if (endDate > currentDate) return "Дата конца не может быть больше текущей даты";
        return null;
    }

    private createAccessAnimalRequest(accessAnimal: AccessAnimalInput): AccessAnimalRequest {
        const id = new AccessAnimalId(accessAnimal.dateStart, accessAnimal.individual, accessAnimal.staff);
        return new AccessAnimalRequest(accessAnimal.dateStart, accessAnimal.individual, accessAnimal.staff, id, accessAnimal.dateEnd);
    }

    private async validateResponseData(responseData: AccessAnimalDto, accessAnimal: AccessAnimalInput): Promise<string | null> {
        const { dateEnd, _links } = responseData;
        const dateStart = this.extractDateFromUrl(_links.self.href);
        const individual = await this.getIndividual(_links.individual.href);
        const staff = await this.getStaff(_links.staff.href);

        if (dateEnd !== accessAnimal.dateEnd ||
            individual !== await this.getIndividual(accessAnimal.individual) ||
            staff !== await this.getStaff(accessAnimal.staff) ||
            dateStart !== accessAnimal.dateStart) {
            return 'Ошибка: данные не обновились';
        }
        return null;
    }

    private extractErrorMessage(response: any): string {
        // @ts-ignore
        const responseBody = response?.text ? response.text() : JSON.stringify(response);
        // @ts-ignore
        const jsonResponse = JSON.parse(responseBody);
        return jsonResponse.message || 'Произошла ошибка';
    }
}
