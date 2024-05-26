import { AbstractService } from "../AbstractService";
import { AnimalsCellsInfo, AnimalsCellsInfoDto, EmbeddedDto } from "./AnimalsCellsInfo.types";

export class AnimalsCellsInfoService extends AbstractService {
    public async getList(): Promise<AnimalsCellsInfo[]> {
        const result = await this.client.get(`${this.baseUrl}/animals-cells-info`);
        const animalsCellsInfoArray: AnimalsCellsInfo[] = await this.getAnimalsCellsInfoArray(result.data);
        return animalsCellsInfoArray;
    }

    private async getAnimalsCellsInfoArray(embeddedDto: EmbeddedDto): Promise<AnimalsCellsInfo[]> {
        const { _embedded } = embeddedDto;
        if (!_embedded || !(_embedded['animals-cells-info'] instanceof Array)) {
            return [];
        }

        const animalsCellsInfoDtos: AnimalsCellsInfoDto[] = _embedded['animals-cells-info'];

        return animalsCellsInfoDtos.map((animalsCellsInfoDto: AnimalsCellsInfoDto) => {
            const {
                rowNum,
                individualName,
                animalTitle,
                cellNumber,
                cellDateStart,
                cellDateEnd,
                gender,
                age,
                weight,
                height
            } = animalsCellsInfoDto;

            return {
                rowNum,
                individualName,
                animalTitle,
                cellNumber,
                cellDateStart,
                cellDateEnd,
                gender,
                age,
                weight,
                height
            };
        });
    }
}
