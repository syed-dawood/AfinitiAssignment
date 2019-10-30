import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {


  constructor(private api: ApiService) { }

  private path = '/api/recipes';

  getMenuItems() {
    return this.api.get<Menu[]>(`${this.path}/GetMenu`);
  }
  getMenuItemById(id: string) {
    return this.api.get<MenuRecipe>(`${this.path}/GetMenu/${id}`);
  }

  getInterIngredient() {
    return this.api.get<Menu[]>(`${this.path}/GetInterIngredient`);
  }
  
  getInterIngredientById(id: string) {
    return this.api.get<MenuRecipe>(`${this.path}/GetInterIngredient/${id}`);
  }

 
  create(data: MenuRecipe) {
    return this.api.post<string, MenuRecipe>(`${this.path}/create`, data);
  }

  update(data: MenuRecipe) {
    return this.api.put(`${this.path}/edit`, JSON.stringify(data));
  }

  post(data: Menu) {
    return this.api.put(`${this.path}/create`, data);
  }

  delete(id: string) {
    return this.api.delete(`${this.path}/${id}`);
  }
}

export class Menu {
  id: string;
  menuItem: string;
  price: string

}
export class MenuRecipe {
  Id: string;
  Name: string;
  Price: string;
  ChildIngredients: string[];
}