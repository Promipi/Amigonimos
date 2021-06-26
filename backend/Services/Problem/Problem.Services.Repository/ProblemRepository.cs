using AutoMapper;
using Common.Collection;
using Common.Paging;
using Common.Responses;
using Problem.Domain.Dtos;
using Problem.Persistance.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Problem.Services.Repository
{
    public class ProblemRepository : IProblemRepository
    {
        private readonly ProblemDbContext _context;
        private readonly IMapper _mapper;

        public ProblemRepository(ProblemDbContext context, IMapper mapper)
        {
            _context = context; _mapper = mapper;
        }

        public async Task<PostResponseDto<Domain.Problem>> Add(ProblemCreateDto problemCreateDto)
        {
            var response = new PostResponseDto<Domain.Problem>();
            try
            {
                var problem = _mapper.Map<Domain.Problem>(problemCreateDto);
                var result = await _context.Problems.AddAsync(problem);
                await _context.SaveChangesAsync();
                response.Success = true;
                response.Message = "Element Craeted";
                response.ElementCreated = result.Entity;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<DeleteResponseDto> Delete(string problemId)
        {
            var response = new DeleteResponseDto();
            try
            {
                _context.Problems.Remove(new Domain.Problem() { Id = problemId });
                await _context.SaveChangesAsync();
                response.Message = "Element Deleted";
                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
            }
            return response;
        }

        public async Task<GetResponseDto<DataCollection<Domain.Problem>>> Get(List<Func<Domain.Problem, bool>> filter, int page, int take)
        {
            var response = new GetResponseDto<DataCollection<Domain.Problem>>();
            try
            {
                var helps = _context.Problems.ToList();
                filter.ForEach(f => { helps = helps.Where(f).ToList(); });
                var result = await helps.GetPagedAsync(page, take);

                response.Success = true;
                response.Message = "Success";
                response.Content = result;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<GetResponseDto<Domain.Problem>> GetById(string id)
        {
            var response = new GetResponseDto<Domain.Problem>();
            try
            {
                response.Content = await _context.Problems.FindAsync(id);
                response.Message = "Success";
                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
            }
            return response;
        }

        public async Task<PostResponseDto<Domain.Problem>> Update(ProblemUpdateDto problemUpdateDto)
        {
            var response = new PostResponseDto<Domain.Problem>();
            try
            {
                var problem = _context.Problems.Find(problemUpdateDto.Id);
                problem.Content = problemUpdateDto.Content;

                var result = _context.Problems.Update(problem);
                await _context.SaveChangesAsync();
                response.Success = true;
                response.Message = "Element Updated";
                response.ElementCreated = result.Entity;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
            }
            return response;
        }
    }
}
