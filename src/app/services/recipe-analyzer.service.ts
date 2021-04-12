import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createRequestOption } from 'src/app/shared';
import { environment } from 'src/environments/environment';
import { AnalyzeRequest } from '../models/analyze-request.model';
import { AnalyzeResponse } from '../models/analyze-response.model';

/**
 * Responsible for communicating with the Recipe Analysis API
 */
@Injectable({ providedIn: 'root' })
export class RecipeAnalyzerService {
  private resourceUrl = environment.recipeApiUrl;

  request: AnalyzeRequest;

  response: AnalyzeResponse;

  /**
   * @param http http client
   * @constructor
   */
  constructor(protected http: HttpClient) {}

  /**
   * responsible for recipe analysis
   * @param recipe recipe object
   * @returns analysis results
   */
  query(recipe: AnalyzeRequest): Observable<HttpResponse<AnalyzeResponse>> {
    this.request = recipe;
    const options = createRequestOption({
        app_id: environment.recipeApiApplicationId,
        app_key: environment.recipeApiApplicationKey
    });
    return this.http.post<AnalyzeResponse>(this.resourceUrl, recipe, { params: options, observe: 'response' });
  }

  /**
   * Responsible for parsing ingredient data from response
   * @returns clean ingredient data ready for consumption
   */
  getIngredientData() {
    if (this.response) {
      const result = this.response.ingredients.map(val => val.parsed[0]);
      return result; 
    }
  }

  /**
   * Responsible for parsing calories data from response
   * @returns only needed calories data ready for consumption
   */
  getTotalCaloriesData() {
    if (this.response) {
      const result = Object.values(this.response.totalNutrients).filter((val: any) => val.label === "Energy");
      return result;
    }
  }

  /**
   * Responsible for parsing nutrition data from response
   * @returns only needed nutrition data ready for consumption
   */
  getTotalNutritionData() {
    if (this.response) {
      const result = Object.values(this.response.totalDaily).filter((val: any) => {
        return val.label === "Calcium"
              || val.label === "Fat"
              || val.label === "Cholesterol"
              || val.label === "Sodium"
              || val.label === "Carbs"
              || val.label === "Fiber"
              || val.label === "Sugars"
              || val.label === "Protein"
              || val.label === "Vitamin D"
              || val.label === "Calcium"
              || val.label === "Iron"
              || val.label === "Potassium"
      });

      return result;
    }
  }
}