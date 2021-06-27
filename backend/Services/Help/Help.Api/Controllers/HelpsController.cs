using Common.Collection;
using Common.Responses;
using Help.Domain.DTOs;
using Help.Services.Repository;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Help.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("AmigonimoPolicy")]
    public class HelpsController : ControllerBase
    {
        private readonly IHelpRepository _repository;

        public HelpsController(IHelpRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<GetResponseDto<DataCollection<Domain.Help>>>> Get(int page = 1, int take = 10, string problemId = "", string ownerId = "")
        {
            List<Func<Domain.Help, bool>> filter = new List<Func<Domain.Help, bool>>() { x => x.Id == x.Id };
            if (problemId != "" && problemId != null) filter.Add(x => x.ProblemId == problemId);
            if (ownerId != "" && ownerId != null) filter.Add(x => x.OwnerId == ownerId);

            var response = await _repository.GetAsync(filter, page, take);
            if (response.Success) return Ok(response);

            return BadRequest(response);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GetResponseDto<Domain.Help>>> Get(string id)
        {
            var response = await _repository.GetByIdAsync(id);
            if (response.Success) return Ok(response);

            return BadRequest(response);
        }

        [HttpPost]
        public async Task<ActionResult<PostResponseDto<Domain.Help>>> Create(HelpCreateDto helpCreateDto)
        {
            var response = await _repository.AddAsync(helpCreateDto);
            if (response.Success) return Ok(response);

            return BadRequest(response);
        }

        [HttpPut]
        public async Task<ActionResult<PostResponseDto<Domain.Help>>> Update(HelpUpdateDto helpUpdateDto)
        {
            var response = await _repository.UpdateAsync(helpUpdateDto);
            if (response.Success) return Ok(response);

            return BadRequest(response);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<DeleteResponseDto> > Update(string id)
        {
            var response = await _repository.DeleteAsync(id);
            if (response.Success) return Ok(response);

            return BadRequest(response);
        }

    }
}
