using Api.Gateway.Proxies;
using Common.Collection;
using Common.Responses;
using Help.Domain.DTOs;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Gateway.WebClient.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ApiExplorerSettings(GroupName ="Help.API")]
    [EnableCors("AmigonimoPolicy")]
    public class HelpsController : ControllerBase
    {
        private readonly IHelpProxy _helpProxy;

        public HelpsController(IHelpProxy helpProxy)
        {
            _helpProxy = helpProxy;
        }

        [HttpGet]
        public async Task<ActionResult<GetResponseDto<DataCollection<Help.Domain.Help>>>> Get(int page = 1, int take = 10, string problemId = "", string ownerId = "")
        {
            var response = await _helpProxy.GetAsync(page, take,problemId,ownerId);
            if (response.Success) return Ok(response);

            return BadRequest(response);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GetResponseDto<Help.Domain.Help>>> Get(string id)
        {
            var response = await _helpProxy.GetByIdAsync(id);
            if (response.Success) return Ok(response);

            return BadRequest(response);
        }

        [HttpPost]
        public async Task<ActionResult<PostResponseDto<Help.Domain.Help>>> Create(HelpCreateDto helpCreateDto)
        {
            var response = await _helpProxy.AddAsync(helpCreateDto);
            if (response.Success) return Ok(response);

            return BadRequest(response);
        }

        [HttpPut]
        public async Task<ActionResult<PostResponseDto<Help.Domain.Help>>> Update(HelpUpdateDto helpUpdateDto)
        {
            var response = await _helpProxy.UpdateAsync(helpUpdateDto);
            if (response.Success) return Ok(response);

            return BadRequest(response);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<DeleteResponseDto>> Update(string id)
        {
            var response = await _helpProxy.DeleteAsync(id);
            if (response.Success) return Ok(response);

            return BadRequest(response);
        }
    }
}
