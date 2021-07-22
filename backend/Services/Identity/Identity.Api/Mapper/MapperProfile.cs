using AutoMapper;
using Identity.Domain;
using Identity.Domain.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;



namespace Identity.Api.Mapper
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            //USER
            CreateMap<UserCreateDto, User>();
            CreateMap<UserUpdateDto, User>();
            CreateMap<User, UserGetDto>();
            
        }
    }
}
