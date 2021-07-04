using Api.Gateway.Proxies;
using Common.Responses;
using Identity.Domain;
using Identity.Domain.Auth;
using Identity.Domain.DTOs;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Api.Gateway.WebClient.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [ApiExplorerSettings(GroupName = "Identity.API")]
    [EnableCors]
    public class UsersController : ControllerBase
    {
        private IUserProxy _userProxy;

        public UsersController(IUserProxy userProxy)
        {
            _userProxy = userProxy;
        }

        [HttpPost("SignUp")] //SignUp
        public async Task<ActionResult<GetResponseDto<TokenInfo>>> SignUp(UserCreateDto userCreateDto)
        {
            var response = await _userProxy.CreateUserAsync(userCreateDto);
            if (!response.Success) return BadRequest(response);
            return Ok(response);
        }

        [HttpPost("LogIn")] //Login
        public async Task<ActionResult<GetResponseDto<TokenInfo>>> LogIn(LoginDto loginDto)
        {
            var response = await _userProxy.LoginAsync(loginDto);
            if (!response.Success) return BadRequest(response);
            return Ok(response);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet]
        public async Task<ActionResult<GetResponseDto<TokenInfo>>> Get(int page = 1, int take = 10)
        {
            List<Func<User, bool>> filter = new List<Func<User, bool>>() { x => x.Id == x.Id };
            var response = await _userProxy.GetAsync(page, take);
            if (!response.Success) return BadRequest(response);
            return Ok(response);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("{id}")]
        public async Task<ActionResult<GetResponseDto<TokenInfo>>> Get(string id)
        {
            var response = await _userProxy.GetByIdAsync(id);
            if (!response.Success) return BadRequest(response);
            return Ok(response);
        }


        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpDelete("{id}")]
        public async Task<ActionResult<GetResponseDto<TokenInfo>>> Delete(string id, [FromQuery] string password)
        {
            var response = await _userProxy.DeleteAsync(id,password);
            if (!response.Success) return BadRequest(response);
            return Ok(response);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPut]
        public async Task<ActionResult<GetResponseDto<TokenInfo>>> Update(UserUpdateDto userUpdateDto)
        {
            var response = await _userProxy.UpdateAsync(userUpdateDto);
            if (!response.Success) return BadRequest(response);
            return Ok(response);
        }

    }
}
