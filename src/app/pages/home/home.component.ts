import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AnalyzeRequest } from 'src/app/models/analyze-request.model';
import { AnalyzeResponse } from 'src/app/models/analyze-response.model';
import { RecipeAnalyzerService } from 'src/app/services/recipe-analyzer.service';

/**
 * Home Page
 */
@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  form = this.formBuilder.group({
    title: [null],
    ingredients: [null, Validators.compose([
      Validators.required
    ])],
  });

  constructor(
    protected formBuilder: FormBuilder,
    private recipeAnalyzerService: RecipeAnalyzerService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  submit() {
    const recipe = this.createFromForm();
    this.subscribeToResponse(this.recipeAnalyzerService.query(recipe));
  }

  private createFromForm(): AnalyzeRequest {
    return {
      ...new AnalyzeRequest(),
      title: this.form.get(['title'])!.value,
      ingr: this.getLinesFromText(this.form.get(['ingredients'])!.value),
    };
  }

  private getLinesFromText(text: string): string[] {
    const lines = text.match(/([^\n]+)/g)||[]    
    return lines;
  }

  protected subscribeToResponse(result: Observable<HttpResponse<AnalyzeResponse>>): void {
    result.subscribe(
      (response) => this.onSaveSuccess(response.body),
      (error) => this.onSaveError(error)
    );
  }

  protected onSaveSuccess(result: AnalyzeResponse): void {
    this.recipeAnalyzerService.response = result;
    this.router.navigateByUrl("/summary");
  }

  protected onSaveError(error: any): void {
    alert("Sorry failed to analyze :(");
  }
}
