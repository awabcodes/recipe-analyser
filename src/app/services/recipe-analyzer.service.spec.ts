import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { RecipeAnalyzerService } from './recipe-analyzer.service';
import { mockData } from './response-sample';

describe('RecipeAnalyzerService', () => {
  let httpMock: HttpTestingController;
  let service: RecipeAnalyzerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(RecipeAnalyzerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get recipe analyzed data', () => {

    const mockRequest = {"title":null,"ingr":["1 cup rice,","10 oz chickpeas"]}

    service.query(mockRequest).subscribe((response: any) => {
      expect(JSON.stringify(response.body)).toEqual(JSON.stringify(mockData));
    });

    const req = httpMock.expectOne('https://api.edamam.com/api/nutrition-details?app_id=47379841&app_key=d28718060b8adfd39783ead254df7f92');
    expect(req.request.method).toEqual('POST');

    req.flush(mockData);
  });

});
