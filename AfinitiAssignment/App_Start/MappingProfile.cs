using AfinitiAssignment.Models;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace AfinitiAssignment.App_Start
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            Mapper.CreateMap<Ingredient, IngredientViewModel>();
            Mapper.CreateMap<IngredientViewModel,Ingredient>();
          
        }

    }
}