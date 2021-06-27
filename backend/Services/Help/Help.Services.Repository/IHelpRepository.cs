using Common.Collection;
using Common.Responses;
using Help.Domain.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Help.Services.Repository
{
    public interface IHelpRepository
    {
        public Task<GetResponseDto<DataCollection<Domain.Help>>> GetAsync(List<Func<Domain.Help, bool>> filter, int page, int take);

        public Task<PostResponseDto<Domain.Help>> AddAsync(HelpCreateDto helpCreateDto);

        public Task<PostResponseDto<Domain.Help>> UpdateAsync(HelpUpdateDto helpUpdateDto);

        public Task<DeleteResponseDto> DeleteAsync(string helpId);

        public Task<GetResponseDto<Domain.Help>> GetByIdAsync(string id);
    }


}
