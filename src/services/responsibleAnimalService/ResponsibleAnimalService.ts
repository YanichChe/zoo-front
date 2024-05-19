import { AbstractService } from "../AbstractService";
import { ResponsibleAnimalDto, ResponsibleAnimal, EmbeddedDto, ResponsibleAnimalId, ResponsibleAnimalRequest, ResponsibleAnimalInput } from "./ResponsibleAnimal.types";

export class ResponsibleAnimalService extends AbstractService {

    public async getResponsibleAnimal(url: string): Promise<ResponsibleAnimal> {
        const result = await this.client.get(url);
        return this.mapResponsibleAnimalDto(result.data);
    }

    public async getList(): Promise<ResponsibleAnimal[]> {
        const result = await this.client.get(`${this.baseUrl}/response-animal`);
        return this.mapResponsibleAnimalArray(result.data);
    }

    private async mapResponsibleAnimalArray(embeddedDto: EmbeddedDto): Promise<ResponsibleAnimal[]> {
        const { _embedded } = embeddedDto;
        if (!_embedded || !Array.isArray(_embedded['response-animal'])) {
            return [];
        }

        const ResponsibleAnimalDtos: ResponsibleAnimalDto[] = _embedded['response-animal'];

        const ResponsibleAnimals: Promise<ResponsibleAnimal>[] = ResponsibleAnimalDtos.map(async (dto) => this.mapResponsibleAnimalDto(dto));
        return Promise.all(ResponsibleAnimals);
    }

    private async mapResponsibleAnimalDto(dto: ResponsibleAnimalDto): Promise<ResponsibleAnimal> {
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

    public async deleteResponsibleAnimal(url: string): Promise<string> {
        const result = await this.client.delete(url);
        return result.data;
    }

    public createResponsibleAnimal = async (ResponsibleAnimal: ResponsibleAnimalInput): Promise<string> => {
        if (ResponsibleAnimal.dateEnd !== null) {
            const dateValidationMessage = this.validateDates(ResponsibleAnimal.dateStart, ResponsibleAnimal.dateEnd);
            if (dateValidationMessage) return dateValidationMessage;
        }

        try {
            const request = this.createResponsibleAnimalRequest(ResponsibleAnimal);
            const response = await this.client.post(`${this.baseUrl}/response-animal`, request);

            return response.data.dateEnd ? 'ok' : this.extractErrorMessage(response);
        } catch (error) {
            console.error('Произошла ошибка:', error);
            return this.extractErrorMessage(error);
        }
    }

    public update = async (responsibleAnimal: ResponsibleAnimalInput, url: string): Promise<string> => {
        console.log('!!!' + url);
        if (responsibleAnimal.dateEnd !== null) {
            const dateValidationMessage = this.validateDates(responsibleAnimal.dateStart, responsibleAnimal.dateEnd);
            if (dateValidationMessage) return dateValidationMessage;
        }

        try {
            const request = this.createResponsibleAnimalRequest(responsibleAnimal);
            const response = await this.client.put(url, request);

            const validationMessage = await this.validateResponseData(response.data, responsibleAnimal);
            return validationMessage || (response.data.dateEnd ? 'ok' : this.extractErrorMessage(response));
        } catch (error) {
            console.error('Произошла ошибка:', error);
            return this.extractErrorMessage(error);
        }
    }

    private validateDates(dateStart: string, dateEnd: string): string | null {
        const startDate = new Date(dateStart);
        const endDate = new Date(dateEnd);
        const currentDate = new Date();

        if (startDate > endDate) return "Дата начала не может быть больше даты окончания";
        if (endDate > currentDate) return "Дата конца не может быть больше текущей даты";
        return null;
    }

    private createResponsibleAnimalRequest(ResponsibleAnimal: ResponsibleAnimalInput): ResponsibleAnimalRequest {
        const id = new ResponsibleAnimalId(ResponsibleAnimal.dateStart, ResponsibleAnimal.individual, ResponsibleAnimal.staff);
        return new ResponsibleAnimalRequest(ResponsibleAnimal.dateStart, ResponsibleAnimal.individual, ResponsibleAnimal.staff, id, ResponsibleAnimal.dateEnd);
    }

    private async validateResponseData(responseData: ResponsibleAnimalDto, ResponsibleAnimal: ResponsibleAnimalInput): Promise<string | null> {
        const { dateEnd, _links } = responseData;
        const dateStart = this.extractDateFromUrl(_links.self.href);
        const individual = await this.getIndividual(_links.individual.href);
        const staff = await this.getStaff(_links.staff.href);

        console.log(dateEnd, ResponsibleAnimal.dateEnd);
        console.log(dateStart, ResponsibleAnimal.dateStart);
        console.log(individual, await this.getIndividual(ResponsibleAnimal.individual));
        console.log(staff, await this.getStaff(ResponsibleAnimal.staff));
    
        if (dateEnd !== ResponsibleAnimal.dateEnd ||
            individual !== await this.getIndividual(ResponsibleAnimal.individual) ||
            staff !== await this.getStaff(ResponsibleAnimal.staff) ||
            dateStart !== ResponsibleAnimal.dateStart) {
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
