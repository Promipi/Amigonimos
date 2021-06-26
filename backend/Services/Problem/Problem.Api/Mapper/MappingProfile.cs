using AutoMapper;
using Problem.Domain.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Problem.Api.Mapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<ProblemCreateDto, Domain.Problem>();
            CreateMap<ProblemUpdateDto, Domain.Problem>();
        }
    }
}
