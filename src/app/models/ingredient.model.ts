import { ParsedIngredient } from "./parsed-ingredient.model";

export class Ingredient {
    constructor(
      public text?: string,
      public parsed?: ParsedIngredient[],
    ) {}
}