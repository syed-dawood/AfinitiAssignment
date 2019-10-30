namespace AfinitiAssignment.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Ingredient")]
    public partial class Ingredient
    {
        public Ingredient()
        {
            IngredientRecipes = new HashSet<IngredientRecipe>();
        }

        public int Id { get; set; }

        [Required]
        [StringLength(200)]
        public string Name { get; set; }

        public double? Price { get; set; }

        public virtual ICollection<IngredientRecipe> IngredientRecipes { get; set; }

    }
}
