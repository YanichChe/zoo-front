import { AbstractService } from "../AbstractService";
import { Vaccination, VaccinationDto, EmbeddedDto } from "./Vaccination.types";

export class VaccinationService extends AbstractService {
    public async getList(): Promise<Vaccination[]> {
        const result = await this.client.get(`${this.baseUrl}/vaccinations`);
        const vaccinationArray: Vaccination[] = this.getVaccinationArray(result.data);
        return vaccinationArray;
    }

    private getVaccinationArray(embeddedDto: EmbeddedDto): Vaccination[] {
        const { _embedded } = embeddedDto;
        if (!_embedded || !(_embedded['vaccinations'] instanceof Array)) {
            return [];
        }
    
        const vaccinationDtos: VaccinationDto[] = _embedded['vaccinations'];
        return vaccinationDtos.map((vaccinationDto: VaccinationDto) => ({
            vaccinationName: vaccinationDto.vaccinationName,
        }));
    }
}
