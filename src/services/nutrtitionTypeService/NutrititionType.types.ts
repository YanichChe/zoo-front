export type NutritionTypeDto = {
    type: string;
}

export type EmbeddedDto = {
    _embedded: {
        "nutrition-types": NutritionTypeDto[];
    }
}

export type NutritionType = {
    type: string;
}
