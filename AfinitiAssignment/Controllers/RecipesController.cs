using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using AfinitiAssignment.Models;

namespace AfinitiAssignment.Controllers
{
    [RoutePrefix("api/recipes")]
    public class RecipesController : ApiController
    {
        private AfinitDataContext db = new AfinitDataContext();

        // GET: api/recipes/GetMenu
        [ResponseType(typeof(IEnumerable<Menu>))]
        [Route("GetMenu")]
        public async Task<IHttpActionResult> GetMenu()
        {

            var Menu = db.Menu.SqlQuery("exec GetMenuItems").AsEnumerable();
            return Ok(Menu);
        }


        // GET: api/recipes/GetMenu/4
        [ResponseType(typeof(MenuRecipe))]
        [Route("GetMenu/{id:int}")]
        public async Task<IHttpActionResult> GetMenu(int id)
        {
            //var param = new SqlParameter("@Id", id);
            //I know of SQL injection yet there was some weired issue causing the parameter not pass correctly
            var Menu = db.Menu.SqlQuery($"exec GetMenuItems @Id={id}").First();

            if (Menu == null)
            {
                return NotFound();
            }

            var ChildIngredientIds = db.IngredientRecipes
                .Where(x => x.ParentIngredientId == Menu.Id)
                .Select(x => x.ChildIngredientId).ToList();
            var MenuRecipe = new MenuRecipe()
            {
                Id = Menu.Id,
                Name = Menu.MenuItem,
                Price = Menu.Price,
                ChildIngredients = ChildIngredientIds
            };


            return Ok(MenuRecipe);
        }


        // GET: api/recipes/GetInterIngredient
        [ResponseType(typeof(IEnumerable<Menu>))]
        [Route("GetInterIngredient")]
        public async Task<IHttpActionResult> GetInterIngredient()
        {

            var Menu = db.Menu.SqlQuery("exec GetIntermediateIngredints").AsEnumerable();
            return Ok(Menu);
        }


        // GET: api/recipes/ GetInterIngredient/4
        [ResponseType(typeof(MenuRecipe))]
        [Route("GetInterIngredient/{id:int}")]
        public async Task<IHttpActionResult> GetInterIngredient(int id)
        {
            //var param = new SqlParameter("@Id", id);
            //I know of SQL Injection yet I have to use this approach due to some problems.
            var Menu = db.Menu.SqlQuery($"exec GetIntermediateIngredints @id={id}").First();

            if (Menu == null)
            {
                return NotFound();
            }

            var ChildIngredientIds = db.IngredientRecipes
                .Where(x => x.ParentIngredientId == Menu.Id)
                .Select(x => x.ChildIngredientId).ToList();
            var InterIngredientRecipe = new MenuRecipe()
            {
                Id = Menu.Id,
                Name = Menu.MenuItem,
                Price = Menu.Price,
                ChildIngredients = ChildIngredientIds
            };


            return Ok(InterIngredientRecipe);
        }

        //// POST: api/recipes/create/
        [ResponseType(typeof(IngredientRecipe))]
        [Route("create")]
        [HttpPost]
        public async Task<IHttpActionResult> createMenu(MenuRecipe item)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            double? Price = db.Ingredients.Where(x => item.ChildIngredients.Contains(x.Id)).Sum(x => x.Price);

            Ingredient IntermediateIngredient = new Ingredient()
            {
                Name = item.Name,
                Price = Price
            };

            db.Ingredients.Add(IntermediateIngredient);
            await db.SaveChangesAsync();
            var Ingredient = db.Ingredients.First(x => x.Name == item.Name);
            foreach (var IngredientId in item.ChildIngredients)
            {
                db.IngredientRecipes.Add(new IngredientRecipe()
                {
                    ChildIngredientId = IngredientId,
                    ParentIngredientId = Ingredient.Id
                });
            }

            await db.SaveChangesAsync();

            return Ok(item);
        }



        // PUT: api/recipes/edit/
        [ResponseType(typeof(MenuRecipe))]
        [Route("edit")]
        [HttpPut]
        public async Task<IHttpActionResult> PutRecipe(MenuRecipe item)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (item.Id == 0)
            {
                return BadRequest();
            }

            if (!IngredientRecipeExists(item.Id))
            {
                return NotFound();
            }

            var PreviousRecipe = db.IngredientRecipes.Where(x => x.ParentIngredientId == item.Id).ToList();
            foreach (var recipe in PreviousRecipe)
            {
                db.IngredientRecipes.Remove(recipe);
                db.SaveChanges();
            }


            foreach (var IngredientId in item.ChildIngredients)
            {
                db.IngredientRecipes.Add(new IngredientRecipe()
                {
                    ChildIngredientId = IngredientId,
                    ParentIngredientId = item.Id
                });
            }
            await db.SaveChangesAsync();

            double? Price = db.Ingredients.Where(x => item.ChildIngredients.Contains(x.Id)).Sum(x => x.Price);

            var Recipe = db.Ingredients.Where(x => x.Id == item.Id).First();
            Recipe.Price = Price;
            db.Entry(Recipe).State = EntityState.Modified;
            await db.SaveChangesAsync();


            return Ok(item);
        }


        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool IngredientRecipeExists(int id)
        {
            return db.IngredientRecipes.Count(e => e.ParentIngredientId == id) > 0;
        }
    }
}