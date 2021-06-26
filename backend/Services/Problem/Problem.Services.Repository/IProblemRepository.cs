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
        public Task<GetResponseDto<DataCollection<Domain.Problem>>> Get(List<Func<Domain.Problem, bool>> filter, int page, int take);

        public Task<PostResponseDto<Domain.Problem>> Add(ProblemCreateDto helpCreateDto);

        public Task<PostResponseDto<Domain.Problem>> Update(ProblemUpdateDto helpUpdateDto);

        public Task<DeleteResponseDto> Delete(string helpId);

        public Task<GetResponseDto<Domain.Problem>> GetById(string id);
    }
}
