import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createRequestOption } from 'src/app/shared';
import { environment } from 'src/environments/environment';
import { AnalyzeRequest } from '../models/analyze-request.model';
import { AnalyzeResponse } from '../models/analyze-response.model';

@Injectable({ providedIn: 'root' })
export class RecipeAnalyzerService {
  private resourceUrl = environment.recipeApiUrl;

  request: AnalyzeRequest;

  response: AnalyzeResponse;

  constructor(protected http: HttpClient) {}

  query(recipe: AnalyzeRequest): Observable<HttpResponse<AnalyzeResponse>> {
    this.request = recipe;
    const options = createRequestOption({
        app_id: environment.recipeApiApplicationId,
        app_key: environment.recipeApiApplicationKey
    });
    return this.http.post<AnalyzeResponse>(this.resourceUrl, recipe, { params: options, observe: 'response' });
  }

}