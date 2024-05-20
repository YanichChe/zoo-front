import { AbstractService } from "../AbstractService";
import { IndividualsVaccination, IndividualsVaccinationDto, EmbeddedDto, IndividualsVaccinationInput, IndividualsVaccinationRequest, IndividualsVaccinationId } from "./IndividualVaccination.types";

export class IndividualsVaccinationService extends AbstractService {

    public async getIndividualsVaccination(url: string): Promise<IndividualsVaccination> {
        const result = await this.client.get(url);
        return this.mapindividualsVaccinationDto(result.data);
    }

    public async getList(): Promise<IndividualsVaccination[]> {
        const result = await this.client.get(`${this.baseUrl}/individual-vaccination`);
    
        const individualsVaccinationArray: IndividualsVaccination[] = await this.getIndividualsVaccinationArray(result.data);
        return individualsVaccinationArray;
    }

    private async getIndividual(url: string): Promise<string> {
        const result = await this.client.get(`${url}`);
        return result.data.name as string;
    }

    private async getVaccination(url: string): Promise<string> {
        const result = await this.client.get(`${url}`);
        return result.data.vaccinationName as string;
    }

    private async getStaff(url: string): Promise<string> {
        const result = await this.client.get(`${url}`);
        return result.data.surname + ' ' + result.data.name + ' ' + result.data.middleName as string;
    }

    private async getIndividualsVaccinationArray(embeddedDto: EmbeddedDto): Promise<IndividualsVaccination[]> {
        const { _embedded } = embeddedDto;
        if (!_embedded || !(_embedded['individual-vaccination'] instanceof Array)) {
            return [];
        }
    
        const individualsVaccinationDtos: IndividualsVaccinationDto[] = _embedded['individual-vaccination'];
    
        const individualsVaccination: Promise<IndividualsVaccination>[] = individualsVaccinationDtos.map(async (dto) => this.mapindividualsVaccinationDto(dto));
        return Promise.all(individualsVaccination);
    }

    private async mapindividualsVaccinationDto(dto: IndividualsVaccinationDto): Promise<IndividualsVaccination> {
        const { _links } = dto;
        const individual = await this.getIndividual(_links.individual.href);
        const vaccination: string = await this.getVaccination(_links.vaccination.href);
        const staff = await this.getStaff(_links.staff.href);
        const self = _links.self.href;
        const date = this.extractDateFromUrl(self);

        return {individual, vaccination, staff, date, self };
    }


    private extractDateFromUrl(url: string): string {
        const parts = url.split('/');
        const datePart = parts[parts.length - 1].split('_');
        return datePart[datePart.length - 1];
    }

    public async deleteindividualsVaccination(url: string): Promise<string> {
        const result = await this.client.delete(url);
        return result.data;
    }

    public createindividualsVaccination = async (individualsVaccination: IndividualsVaccinationInput): Promise<string> => {
 
        const dateValidationMessage = this.validateDate(individualsVaccination.date);
        if (dateValidationMessage) return dateValidationMessage;
    
        try {
            const request = this.createindividualsVaccinationRequest(individualsVaccination);
            const response = await this.client.post(`${this.baseUrl}/individual-vaccination`, request);

            return response.data._links.self.href !== undefined ? 'ok' : this.extractErrorMessage(response);
        } catch (error) {
            console.error('Произошла ошибка:', error);
            return this.extractErrorMessage(error);
        }
    }

    public update = async (individualsVaccination: IndividualsVaccinationInput, url: string): Promise<string> => {
        this.deleteindividualsVaccination(url)
        const code = await this.createindividualsVaccination(individualsVaccination);
        return code
    }

    private validateDate(date: string): string | null {
        const startDate = new Date(date);
        const currentDate = new Date();

        if (startDate > currentDate) return "Дата конца не может быть больше текущей даты";
        return null;
    }

    private createindividualsVaccinationRequest(individualsVaccination: IndividualsVaccinationInput): IndividualsVaccinationRequest {
        const id = new IndividualsVaccinationId(individualsVaccination.date, individualsVaccination.individual, individualsVaccination.vaccination);
        return new IndividualsVaccinationRequest(
            individualsVaccination.date, 
            individualsVaccination.individual, 
            individualsVaccination.vaccination,
            individualsVaccination.staff, 
            id)
    }
        private extractErrorMessage(response: any): string {
        // @ts-ignore
        const responseBody = response?.text ? response.text() : JSON.stringify(response);
        // @ts-ignore
        const jsonResponse = JSON.parse(responseBody);
        return jsonResponse.message || 'Произошла ошибка';
    }
}
