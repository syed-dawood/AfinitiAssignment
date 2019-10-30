namespace AfinitiAssignment.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class AfinitDataContext : DbContext
    {
        public AfinitDataContext()
            : base("name=AfinitDataModel")
        {
        }

        public virtual DbSet<Ingredient> Ingredients { get; set; }
        public virtual DbSet<IngredientRecipe> IngredientRecipes { get; set; }
        public virtual DbSet<Menu> Menu { get; set; }


        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Ingredient>()
                .Property(e => e.Name)
                .IsUnicode(false);

            modelBuilder.Entity<Ingredient>()
                .HasMany(e => e.IngredientRecipes)
                .WithRequired(e => e.Ingredient)
                .HasForeignKey(e => e.ChildIngredientId)
                .WillCascadeOnDelete(false);

           
        }
    }
}
