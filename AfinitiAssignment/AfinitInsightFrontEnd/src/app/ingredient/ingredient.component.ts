import { Component, OnInit } from '@angular/core';
import { IngredientService, Ingredient } from '../ingredient.service';
import { RecipeService, MenuRecipe, Menu } from '../recipe.service';


@Component({

  selector: 'ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit {
  ShowRecipeDetails = false;
  ShowInterIngredientDetails = false;
  NewRecipeIngredients: any[];
  MenuItemDetails: any;
  IngredientOfMenuItem: any = [];
  CreateIngredient = true;
  Ingredient: Ingredient;
  RecipeName = '';
  RecipeErrors = '';
  Price: number;
  SelectedValue: Ingredient[];
  AllIngredients: any = [];
  IngredientErrors: any;
  IngredientSuccess: any;
  NewIngredientId: any;
  MenuRecipe: MenuRecipe;
  RecipeSucess: string;
  router: any;
  MenuItems: any = [];
  InterIngredients: any;
  InterIngredientDetails: any;
  EditingRecipe = false;
  NewRecipeError: string;
  NewRecipeSuccess: string;
  NewInterIngredients: any;
  EditingInterIngredients: boolean;
  NewInterIngredientError: string;
  NewInterIngredientSuccess: string;
  constructor(private ingredientService: IngredientService,
    private recipeService: RecipeService) { }

  ngOnInit() {
    this.NewRecipeIngredients = [];
    this.NewInterIngredients = [];
    this.MenuItemDetails = new MenuRecipe();
    this.InterIngredientDetails = new MenuRecipe();
    this.Ingredient = new Ingredient();
    this.InitIngredients();
    this.initMenuItems();
    this.initIntermediateIngredients();
  }

  initMenuItems() {
    this.recipeService.getMenuItems().subscribe(response => {
      this.MenuItems = response;
    });
    this.ShowRecipeDetails = false;

  }

  initIntermediateIngredients() {
    this.recipeService.getInterIngredient().subscribe(response => {
      this.InterIngredients = response;
    });
    this.ShowInterIngredientDetails = false;

  }

  InitIngredients() {
    this.ingredientService.get().subscribe(response => {
      this.AllIngredients = response;
    });
  }


  MapIngredient(id) {
    return this.AllIngredients.find(x => x.Id == id);
  }
  UpdatePrice() {
    console.log(this.SelectedValue);
    this.Price = 0;
    this.Ingredient.Name = '';
    this.Ingredient.Price = 0;

    if (this.SelectedValue != null && this.SelectedValue.length != 0) {
      this.CreateIngredient = false;
      this.RecipeErrors = '';
      this.SelectedValue.forEach(i => {
        this.Price += i.Price;

      });

      if (this.SelectedValue.length == 1) {
        this.Ingredient.Price = this.SelectedValue[0].Price;
        this.Ingredient.Name = this.SelectedValue[0].Name;
        this.Ingredient.Id = this.SelectedValue[0].Id;
      } else {
        this.CreateIngredient = true;
      }
    } else {
      this.RecipeErrors = 'Add any item to recipe';
      this.CreateIngredient = true;
    }
  }
  MakeRecipe() {
    this.RecipeErrors = '';
    if (this.RecipeName.trim() == '') {
      this.RecipeErrors = ' Add A Recipe Name';
      return;
    }
    if (this.SelectedValue == null || this.SelectedValue.length == 0) {
      this.RecipeErrors = 'Add any item to recipe';
      return;
    }
    this.MenuRecipe = new MenuRecipe();
    this.MenuRecipe.Name = this.RecipeName;
    this.MenuRecipe.ChildIngredients = [];
    this.SelectedValue.forEach(value => {
      this.MenuRecipe.ChildIngredients.push(value.Id);
    });

    if (this.MenuRecipe.ChildIngredients.length > 1) {

      const Action = this.recipeService.create(this.MenuRecipe);

      Action.subscribe(resp => {
        this.NewIngredientId = resp;

        this.RecipeSucess = 'Recipe Created!';
        this.RecipeName = '';
        this.SelectedValue = [];
        this.InitIngredients();
        this.initMenuItems();
        this.initIntermediateIngredients();



      }, err => {
        this.RecipeSucess = '';
        this.RecipeSucess = 'Network Problem';
        console.log(err);
      });
    } else {
      this.RecipeSucess = '';
      this.RecipeErrors = 'Recipe Must be At least of 2 Ingredients';
    }
  }

  ChangeIngredient() {
    this.IngredientErrors = '';
  }
  SubmitIngredient() {

    if (this.Ingredient.Name.trim() == '') {
      this.IngredientErrors = 'Supply a Name for Ingredient';
      return;
    }
    if (this.Ingredient.Price <= 0) {
      this.IngredientErrors = 'Price Should be higher than 0';
      return;
    }
    if (this.Ingredient.Id || this.CreateIngredient) {

      const Action = this.CreateIngredient
        ? this.ingredientService.create(this.Ingredient)
        : this.ingredientService.update(this.Ingredient);

      Action.subscribe(resp => {
        this.NewIngredientId = resp;

        if (this.CreateIngredient) {
          this.Ingredient = new Ingredient();
        }
        this.Price = 0;
        this.InitIngredients();
        this.IngredientErrors = '';
        this.IngredientSuccess = this.CreateIngredient == true ? 'Sucessfully Added' : ' Sucessfully Updated';
        this.initMenuItems();
        this.initIntermediateIngredients();



      }, err => {
        this.IngredientSuccess = '';
        this.IngredientErrors = 'Network Problem';
        console.log(err);
      });
    }

  }


  DeleteIngredient() {
    if (this.Ingredient.Id && !this.CreateIngredient) {
      const Action = this.ingredientService.delete(this.Ingredient.Id);
      Action.subscribe(resp => {
        this.NewIngredientId = resp;
        this.Ingredient = new Ingredient();
        this.CreateIngredient = true;
        this.InitIngredients();
        this.IngredientErrors = '';
        this.IngredientSuccess = ' Sucessfully Deleted';
        this.Price = 0;
        this.initMenuItems();
        this.initIntermediateIngredients();

      }, err => {
        this.IngredientSuccess = '';
        this.IngredientErrors = 'Network Problem';
        console.log(err);
      });

    } else {
      this.IngredientSuccess = '';
      this.IngredientErrors = 'Can Not Delete';
    }
  }






  RecipeDetails(Id) {


    this.recipeService.getMenuItemById(Id).subscribe(response => {
      this.MenuItemDetails = response;
    });
    this.ShowRecipeDetails = true;
  }

  IntermediateIngredientDetails(Id) {

    this.recipeService.getInterIngredientById(Id).subscribe(response => {
      this.InterIngredientDetails = response;
    });
    this.ShowInterIngredientDetails = true;
  }



  EditRecipeIngredients() {


    this.MenuItemDetails.ChildIngredients.forEach(element => {
      this.NewRecipeIngredients.push(element);
    });
    this.EditingRecipe = true;

  }


  EditInterIngredients() {


    this.InterIngredientDetails.ChildIngredients.forEach(element => {
      this.NewInterIngredients.push(element);
    });
    this.EditingInterIngredients = true;

  }

  RecalcualteRecipePrice() {
    this.MenuItemDetails.Price = 0;
    this.NewRecipeIngredients.forEach(x => {
      this.MenuItemDetails.Price += this.MapIngredient(x).Price;
    });
  }
  SubmitNewRecipeIngredients() {
    if (this.NewRecipeIngredients.length > 1) {
      this.MenuItemDetails.ChildIngredients = this.NewRecipeIngredients;
      const Action = this.recipeService.update(this.MenuItemDetails);
      Action.subscribe(resp => {
        this.NewIngredientId = resp;

        this.InitIngredients();
        this.NewRecipeError = '';
        this.NewRecipeSuccess = ' Sucessfully Updated';
        this.initMenuItems();
        this.initIntermediateIngredients();
        this.RecipeDetails(this.MenuItemDetails.Id);
        this.EditingRecipe = false;
        this.ShowRecipeDetails = false;

      }, err => {
        this.NewRecipeSuccess = '';
        this.NewRecipeError = 'Network Problem';
        console.log(err);
      });

    }
    else {
      this.NewRecipeError = 'There must be at least two Ingredients';

    }
  }

  RecalcualteInterIngredienPrice() {
    this.NewInterIngredients.Price = 0;
    this.NewInterIngredients.foreach(x => {
      this.InterIngredientDetails.Price += this.MapIngredient(x).Price;
    });
  }
  SubmitNewInterIngredients() {
    if (this.NewInterIngredients.length > 1) {
      this.InterIngredientDetails.ChildIngredients = this.NewInterIngredients;
      const Action = this.recipeService.update(this.InterIngredientDetails);
      Action.subscribe(resp => {


        this.InitIngredients();
        this.NewInterIngredientError = '';
        this.NewInterIngredientSuccess = ' Sucessfully Updated';
        this.initMenuItems();
        this.initIntermediateIngredients();
        this.IntermediateIngredientDetails(this.InterIngredientDetails.Id);
        this.EditingInterIngredients = false;
        this.ShowInterIngredientDetails = false;

      }, err => {
        this.NewInterIngredientSuccess = '';
        this.NewInterIngredientError = 'Network Problem';
        console.log(err);
      });

    }
    else {
      this.NewInterIngredientError = 'There must be at least two Ingredients';

    }
  }

}
