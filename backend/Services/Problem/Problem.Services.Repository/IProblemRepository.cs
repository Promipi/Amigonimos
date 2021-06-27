using Common.Collection;
using Common.Responses;
using Problem.Domain.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Problem.Services.Repository
{
    public interface IProblemRepository
    {
        public Task<GetResponseDto<DataCollection<Domain.Problem>>> GetAsync(List<Func<Domain.Problem, bool>> filter, int page, int take);

        public Task<PostResponseDto<Domain.Problem>> AddAsync(ProblemCreateDto helpCreateDto);

        public Task<PostResponseDto<Domain.Problem>> UpdateAsync(ProblemUpdateDto helpUpdateDto);

        public Task<DeleteResponseDto> DeleteAsync(string helpId);

        public Task<GetResponseDto<Domain.Problem>> GetByIdAsync(string id);
    }
}
