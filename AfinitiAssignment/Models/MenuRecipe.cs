using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AfinitiAssignment.Models
{
    public class MenuRecipe
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double? Price { get; set; }

        public ICollection<int> ChildIngredients { get; set; }
    }
}