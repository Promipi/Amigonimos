using Api.Gateway.Proxies;
using Common.Collection;
using Common.Responses;
using Microsoft.AspNetCore.Mvc;
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
    }
}
