using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Problem.Api.Common;
using Problem.Domain.Dtos;
using Problem.Services.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Problem.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AmigonimoPolicy")]
    public class ProblemsController : ControllerBase
    {

        IProblemRepository _repository;
        public ProblemsController(IProblemRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<DataCollection<Domain.Problem>>> Get(int page = 1, int take = 10, string ownerId = "", DateTime creationDate = default)
        {
            List<Func<Domain.Problem, bool>> filter = new List<Func<Domain.Problem, bool>>() { x => x.Id == x.Id };   
            if (ownerId != "") filter.Add(x => x.OwnerId == ownerId);
            if (creationDate != default) filter.Add(x => x.CreationDate == creationDate);

            var response = await _repository.Get(filter, page, take);
            if (response.Success) return Ok(response);

            return BadRequest(response);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Domain.Problem>> Get(string id)
        {
            var response = await _repository.GetById(id);
            if (response.Success) return Ok(response);

            return BadRequest(response);
        }

        [HttpPost]
        public async Task<ActionResult<bool>> Create(ProblemCreateDto problemCreateDto)
        {
            var response = await _repository.Add(problemCreateDto);
            if (response.Success) return Ok(response);

            return BadRequest(response);
        }

        [HttpPut]
        public async Task<ActionResult<bool>> Update(ProblemUpdateDto problemUpdateDto)
        {
            var response = await _repository.Update(problemUpdateDto);
            if (response.Success) return Ok(response);

            return BadRequest(response);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> Delete(string id)
        {
            var response = await _repository.Delete(id);
            if (response.Success) return Ok(response);

            return BadRequest(response);
        }
    }
}
