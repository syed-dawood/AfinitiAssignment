using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AfinitiAssignment.Models
{
    public class Menu
    {
        public int Id { get; set; }
        public string MenuItem { get; set; }
        public double? Price { get; set; }

        public IngredientRecipe MenuIngredients { get; set; }
    }
}