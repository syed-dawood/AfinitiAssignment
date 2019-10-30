import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private api: ApiService) { }

  private path = 'api/Ingredients';

  get() {
    return this.api.get<Ingredient[]>(`${this.path}`);
  }

  create(data: Ingredient) {
    return this.api.post<string, Ingredient>(`${this.path}/create`, data);
  }

  update(data: Ingredient) {
    return this.api.put(`${this.path}/edit`, JSON.stringify(data) );
  }

  post(data: Ingredient) {
    return this.api.put(`${this.path}/create`, data);
  }

  delete(id: string) {
    return this.api.delete(`${this.path}/${id}`);
  }
}
export class Ingredient{
  Id:string;
  Name:string;
  Price:number

}