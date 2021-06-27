using Api.Gateway.Proxies;
using Common.Collection;
using Common.Responses;
using Microsoft.AspNetCore.Mvc;
using Problem.Domain.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Gateway.WebClient.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProblemsController : ControllerBase
    {
        private readonly IProblemProxy _problemProxy;

        public ProblemsController(IProblemProxy problemProxy)
        {
            _problemProxy = problemProxy;
        }
        [HttpGet]
        public async Task<ActionResult<GetResponseDto<DataCollection<Problem.Domain.Problem>>>> Get(int page=1,int take=10,string ownerId="",DateTime creationDate=default)
        {
            var response = await _problemProxy.GetAsync(page, take, ownerId,creationDate);
            if (response.Success) return Ok(response);
            return BadRequest(response);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Problem.Domain.Problem>> Get(string id)
        {
            var response = await _problemProxy.GetByIdAsync(id);
            if (response.Success) return Ok(response);

            return BadRequest(response);
        }

        [HttpPost]
        public async Task<ActionResult<bool>> Create(ProblemCreateDto problemCreateDto)
        {
            var response = await _problemProxy.AddAsync(problemCreateDto);
            if (response.Success) return Ok(response);

            return BadRequest(response);
        }

        [HttpPut]
        public async Task<ActionResult<bool>> Update(ProblemUpdateDto problemUpdateDto)
        {
            var response = await _problemProxy.UpdateAsync(problemUpdateDto);
            if (response.Success) return Ok(response);

            return BadRequest(response);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> Delete(string id)
        {
            var response = await _problemProxy.DeleteAsync(id);
            if (response.Success) return Ok(response);

            return BadRequest(response);
        }
    }
}
