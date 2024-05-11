import { AbstractService } from "../AbstractService";
import { IndividualsVaccination, IndividualsVaccinationDto, EmbeddedDto } from "./IndividualVaccination.types";

export class IndividualsVaccinationService extends AbstractService {
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
        return result.data.name as string;
    }

    private async getIndividualsVaccinationArray(embeddedDto: EmbeddedDto): Promise<IndividualsVaccination[]> {
        const { _embedded } = embeddedDto;
        if (!_embedded || !(_embedded['individual-vaccination'] instanceof Array)) {
            return [];
        }
    
        const individualsVaccinationDtos: IndividualsVaccinationDto[] = _embedded['individual-vaccination'];
    
        const individualsVaccinationArray: Promise<IndividualsVaccination>[] = individualsVaccinationDtos.map(async (individualsVaccinationDto: IndividualsVaccinationDto) => {
            const individual: string = await this.getIndividual(individualsVaccinationDto._links.individual.href);
            const vaccination: string = await this.getVaccination(individualsVaccinationDto._links.vaccination.href);
            const staff: string = await this.getStaff(individualsVaccinationDto._links.staff.href);
            return {
                individual,
                vaccination,
                staff
            };
        });
    
        return Promise.all(individualsVaccinationArray);
    }
}
