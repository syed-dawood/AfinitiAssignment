import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ApiService } from './api.service';
import { HttpClientModule } from "@angular/common/http";
import { IngredientComponent } from './ingredient/ingredient.component';
import { FormsModule } from "@angular/forms";
@NgModule({
  declarations: [
    AppComponent,
    IngredientComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule
    

    
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
