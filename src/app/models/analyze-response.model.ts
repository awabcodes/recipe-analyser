import { Ingredient } from "./ingredient.model";

export class AnalyzeResponse {
    constructor(
      public uri?: string,
      public calories?: number,
      public ingredients?: Ingredient[],
      public dietLabels?: string[],
      public healthLabels?: string[],
      public cautions?: string[],
      public totalDaily?: any,
      public totalNutrients?: any,
      public totalWeight?: number
    ) {}
}