using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using AfinitiAssignment.Models;
using AutoMapper;

namespace AfinitiAssignment.Controllers
{
    [RoutePrefix("api/Ingredients")]
    public class IngredientsController : ApiController
    {
        private AfinitDataContext db = new AfinitDataContext();


        // GET: api/Ingredients
        [ResponseType(typeof(IngredientViewModel))]
        [Route("")]
        [HttpGet]
        public async Task<IHttpActionResult> GetIngredients()
        {
            var AllIngredients = db.Ingredients.Select(x => new IngredientViewModel
            {
                Id = x.Id,
                Name = x.Name,
                Price = x.Price
            }

            ).ToList();
            return Ok(AllIngredients);
        }

        // GET: api/Ingredients/5
        [ResponseType(typeof(IngredientViewModel))]
        [Route("{id:int}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetIngredient(int id)
        {
            Ingredient ingredient = await db.Ingredients.FindAsync(id);
            if (ingredient == null)
            {
                return NotFound();
            }

            return Ok(Mapper.Map<Ingredient, IngredientViewModel>(ingredient));
        }

        // PUT: api/Ingredients/ingredient
        [ResponseType(typeof(IngredientViewModel))]
        [Route("edit")]
        [HttpPut]
        public async Task<IHttpActionResult> PutIngredient([FromBody]IngredientViewModel ingredient)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            if (ingredient.Id == 0)
            {
                return BadRequest();
            }

            db.Entry(Mapper.Map<IngredientViewModel, Ingredient>(ingredient)).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IngredientExists(ingredient.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(ingredient);
        }

        // POST: api/Ingredients
        [ResponseType(typeof(IngredientViewModel))]
        [Route("create")]
        [HttpPost]
        public async Task<IHttpActionResult> PostIngredient(IngredientViewModel ingredient)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Ingredients.Add(Mapper.Map<IngredientViewModel, Ingredient>(ingredient));
            await db.SaveChangesAsync();

            return Ok(ingredient.Id);
        }

        // DELETE: api/Ingredients/5
        [ResponseType(typeof(IngredientViewModel))]
        [Route("{id:int}"), HttpDelete]
        public async Task<IHttpActionResult> DeleteIngredient(int id)
        {
            Ingredient ingredient = await db.Ingredients.FindAsync(id);
            if (ingredient == null)
            {
                return NotFound();
            }

            ingredient.IngredientRecipes.Clear();

            //if the ingredient is refrenced  in recipes, it must be deleted first
            var AsRecipeIngredient = db.IngredientRecipes.Where(x => x.ChildIngredientId == id).ToList();
            foreach (var ingredientIn in AsRecipeIngredient)
            {
                db.IngredientRecipes.Remove(ingredientIn);
                //we can not use async here as it must be done before it goes further
                db.SaveChanges();
            }
         

            var AsRecipe = db.IngredientRecipes.Where(x => x.ParentIngredientId == id).ToList();
            foreach (var recipe in AsRecipe)
            {
                db.IngredientRecipes.Remove(recipe);
                db.SaveChanges();
            }


            db.Ingredients.Remove(ingredient);
            db.SaveChanges();

            return Ok(Mapper.Map<Ingredient, IngredientViewModel>(ingredient));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool IngredientExists(int id)
        {
            return db.Ingredients.Count(e => e.Id == id) > 0;
        }
    }
}