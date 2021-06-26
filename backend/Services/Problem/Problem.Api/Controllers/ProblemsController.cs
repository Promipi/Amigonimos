using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Problem.Api.Common;
using Problem.Api.DTOs;
using Problem.Api.Repository;
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

        IProblemsRepository _repository;
        public ProblemsController(IProblemsRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<DataCollection<Models.Problem>>> Get(int page = 1, int take = 10, string ownerId = "", DateTime creationDate = default)
        {
            Func<Models.Problem, bool> filter = x=>x.Id==x.Id;
            if (ownerId != "") filter += x => x.OwnerId == ownerId;
            if (creationDate != default) filter += x => x.CreationDate == creationDate;

            var result = await _repository.Get(filter, page, take);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Models.Problem>> GetById(string id)
        {
            var result = await _repository.GetById(id);
            return result;
        }

        [HttpPost]
        public async Task<ActionResult<bool>> Add(ProblemCreateDto problemCreationDto)
        {
            var result = await _repository.Add(problemCreationDto);
            return Ok(result);
        }

        [HttpPut]
        public async Task<ActionResult<bool>> Update(ProblemUpdateDto problemUpdateDto)
        {
            var result = await _repository.Update(problemUpdateDto);
            return Ok(result);
        }

        [HttpDelete]
        public async Task<ActionResult<bool>> Delete(string ownerId)
        {
            var result = await _repository.Delete(ownerId);
            return Ok(result);
        }
    }
}
