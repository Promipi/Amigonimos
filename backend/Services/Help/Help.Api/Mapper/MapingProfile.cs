using AutoMapper;
using Help.Domain.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Help.Api.Mapper
{
    public class MapingProfile : Profile
    {
        public MapingProfile()
        {
            CreateMap<HelpCreateDto, Domain.Help>();
            CreateMap<HelpUpdateDto, Domain.Help>();
        }
    }
}
