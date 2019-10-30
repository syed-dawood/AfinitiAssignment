namespace AfinitiAssignment.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("IngredientRecipe")]
    public partial class IngredientRecipe
    {
        public int Id { get; set; }

        public int ParentIngredientId { get; set; }

        public int ChildIngredientId { get; set; }

        public virtual Ingredient Ingredient { get; set; }

    }
}
