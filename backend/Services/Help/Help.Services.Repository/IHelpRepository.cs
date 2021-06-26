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
        public Task<GetResponseDto<DataCollection<Domain.Help>>> Get(List<Func<Domain.Help, bool>> filter, int page, int take);

        public Task<PostResponseDto<Domain.Help>> Add(HelpCreateDto helpCreateDto);

        public Task<PostResponseDto<Domain.Help>> Update(HelpUpdateDto helpUpdateDto);

        public Task<DeleteResponseDto> Delete(string helpId);

        public Task<GetResponseDto<Domain.Help>> GetById(string id);
    }


}
