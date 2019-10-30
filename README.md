# AIHiringAssignment

This restaurant system made via _C# Web Api (.Net Framework 4.7.2), Angular (8) with Database in MSSQL_ allows the user to 
- Add new ingredients
- Update Ingredient name and price
- Delete them 
- Multiple __Ingredients__ can be selected from the _multi select_ list and given a  recipe name to store it in the database. 
- Every recipe is put again in the list of Ingredients as It may be Intermediate Inventory or used as Ingredient in other recipes
- Every Ingredient or recipe can be deleted
-The Ingredients of every recipe and Intermediate Ingredient can be updated
- The price is calculated and shown while you select multiple ingredients
- The price can be manually set as well
- Validation of at least 2 Ingredients to make a recipe
- Name of recipe or ingredient while updating or creating must not be empty

## Structure
The C# Web Api Project __AfinitiAssignment__ folder has its files and the angular app in __AfinitInsightFrontEnd__ folder.


## Installation
- [Visual Studio](https://visualstudio.microsoft.com/) must be installed with _.Net Framework 4.7.2_ 
- Now open the _AfinitiAssignment.sln_ from the folder AfinitAssignment in Visual Studio
- Right Click on the Solution In Visual Studio and Click Restore Nuget Packages to get any missing packages.

- [NodeJS](https://nodejs.org/en/)
 must be installed.
- Use the __NPM__ Node package manager in Terminal/Powershell or Command Prompt to install angular

```
npm install -g @angular/cli
```
- Go to the  __AfinitInsightFrontEnd__ folder and must run

```
npm install
```
to install any missing modules

- [Microsft SQL Management Studio ](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15) 14 or later must be installed
- Restore the database file _Afinit Database.bak_ from the Afinit Assignment folder. [How to Restore](https://docs.microsoft.com/en-us/sql/relational-databases/backup-restore/restore-a-database-backup-using-ssms?view=sql-server-ver15)

- In Visual Studio open __Web.Config__ and modify the connection data source part ( _.\SQLEXPRESS_ ) to the name of your SQL Server. [Setting up Conenection Strings](https://stackoverflow.com/questions/5642474/setting-up-connection-string-in-asp-net-to-sql-server)

## Usage
- In Visual Studio click start or press _f5_ to run the web api
- Now from the folder _AfinitInsightFrontEnd_ in Terminal or Command prompt run 
```
ng serve
```
to start the Angular app and open __localhost:4200__ in any browser.
- That is it!



## Main Code Files
#### Visual Studio:
- IngredientsController.cs
- RecipesController.cs
- Models Folder all files.

#### Angular:
- ingredient.component.ts
- ingredient.component.html
- ingredient.service.ts
- recipe.services.ts
- api.service.ts


