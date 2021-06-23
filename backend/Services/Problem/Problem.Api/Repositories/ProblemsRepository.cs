using AutoMapper;
using Problem.Api.Common;
using Problem.Api.DTOs;
using Problem.Api.Mapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Problem.Api.Repository
{
    public interface IProblemsRepository
    {
        public Task<DataCollection<Models.Problem>> Get(Func<Models.Problem, bool> filter, int page, int take);

        public Task<bool> Add(ProblemCreateDto problemCreateDto);

        public Task<bool> Update(ProblemUpdateDto problemUpdateDto);

        public Task<bool> Delete(string problemId);
    }

    public class ProblemsRepository : IProblemsRepository
    {
        private readonly ApplicationDbContext _context;

        public ProblemsRepository(ApplicationDbContext context)
        {
            _context = context; 
        }

        public async Task<DataCollection<Models.Problem>> Get(Func<Models.Problem,bool> filter,int page,int take)
        {
            var result = await _context.Problems.Where(filter).GetPagedAsync(page,take);

            return result;
        }

        public async Task<bool> Add(ProblemCreateDto problemCreateDto)
        {
            var problem = problemCreateDto.MapTo<Models.Problem>();

            _context.Problems.Add(problem);

            _context.SaveChanges();

            return true;
        }

        public async Task<bool> Update(ProblemUpdateDto problemUpdateDto)
        {
            _context.Problems.Update(problemUpdateDto.MapTo<Models.Problem>());
            _context.SaveChanges();
            return true;
        }

        public async Task<bool> Delete(string problemId)
        {
            _context.Problems.Remove(new Models.Problem() { Id = problemId });
            _context.SaveChanges();
            return true;
        }



    }
}
