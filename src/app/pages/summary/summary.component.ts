import { Component, OnInit } from '@angular/core';
import { RecipeAnalyzerService } from 'src/app/services/recipe-analyzer.service';

/**
 * Summary Page
 */
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  showTotal: boolean;
  totalCalories: any[];
  totalNutritions: any[];

  displayedColumns: string[] = ['quantity', 'measure', 'food', 'nutrients', 'weight'];
  dataSource: any;

  constructor(
    private recipeAnalyzerService: RecipeAnalyzerService
  ) {
  }

  ngOnInit(): void {
    this.dataSource = this.recipeAnalyzerService.getIngredientData();
    this.totalCalories = this.recipeAnalyzerService.getTotalCaloriesData();
    this.totalNutritions = this.recipeAnalyzerService.getTotalNutritionData();
  }

  totalNutrition() {
    this.showTotal = true;
  }
}
