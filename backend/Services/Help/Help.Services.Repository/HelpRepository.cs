using AutoMapper;
using Common.Collection;
using Common.Paging;
using Common.Responses;
using Help.Domain.DTOs;
using Help.Persistence.Database;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Help.Services.Repository
{
    public class HelpRepository : IHelpRepository
    {
        private readonly HelpDbContext _context;
        private readonly IMapper _mapper;

        public HelpRepository(HelpDbContext context,IMapper mapper)
        {
            _context = context; _mapper = mapper;
        }

        public async Task<GetResponseDto<DataCollection<Domain.Help>>> GetAsync(List<Func<Domain.Help, bool>> filter, int page, int take)
        {
            var response = new GetResponseDto<DataCollection<Domain.Help>>();
            try {
                var helps = _context.Helps.ToList();
                filter.ForEach(f => { helps = helps.Where(f).ToList(); });
                var result = await helps.GetPagedAsync(page, take);

                response.Success = true;
                response.Message = "Success";
                response.Content = result;
            }
            catch(Exception ex){
                response.Message = ex.Message;
            }

            return response;         
        }

        public async Task<PostResponseDto<Domain.Help>> AddAsync(HelpCreateDto helpCreateDto)
        {
            var response = new PostResponseDto<Domain.Help>();
            try{
                var problem = _mapper.Map<Domain.Help>(helpCreateDto);
                var result = await _context.Helps.AddAsync(problem);
                await _context.SaveChangesAsync();
                response.Success = true;
                response.Message = "Element Craeted";
                response.ElementCreated = result.Entity;
            }
            catch(Exception ex){
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<PostResponseDto<Domain.Help>> UpdateAsync(HelpUpdateDto helpUpdateDto)
        {
            var response = new PostResponseDto<Domain.Help>();
            try
            {
                var problem = _context.Helps.Find(helpUpdateDto.Id);
                problem.Content = helpUpdateDto.Content;

                var result = _context.Helps.Update(problem);
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

        public async Task<DeleteResponseDto> DeleteAsync(string problemId)
        {
            var response = new DeleteResponseDto();
            try
            {
                _context.Helps.Remove(new Domain.Help() { Id = problemId });
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

        public async Task<GetResponseDto<Domain.Help>> GetByIdAsync(string id)
        {
            var response = new GetResponseDto<Domain.Help>();
            try
            {
                response.Content = await _context.Helps.FindAsync(id);
                response.Message = "Success";
                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
            }
            return response;
        }

    }
}
