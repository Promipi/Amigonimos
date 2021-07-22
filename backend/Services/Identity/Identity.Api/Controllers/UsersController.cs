using Common.Responses;
using Identity.Domain;
using Identity.Domain.Auth;
using Identity.Domain.DTOs;
using Identity.Services.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Identity.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("AmigonimoPolicy")]
    public class UsersController : ControllerBase
    {
        private IUserRepository _userRepository;

        public UsersController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        

        [HttpPost("SignUp")] //SignUp
        public async Task<ActionResult<GetResponseDto<TokenInfo>>> SignUp(UserCreateDto userCreateDto)
        {
            var response = await _userRepository.CreateUserAsync(userCreateDto);
            if (!response.Success) return BadRequest(response);
            return Ok(response);
        }

        [HttpPost("LogIn")] //Login
        public async Task<ActionResult<GetResponseDto<TokenInfo>>> LogIn(LoginDto loginDto)
        {
            var response = await _userRepository.LoginAsync(loginDto);
            if (!response.Success) return BadRequest(response);
            return Ok(response);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet]
        public async Task<ActionResult<GetResponseDto<TokenInfo>>> Get(int page=1,int take=10)
        {
            List<Func<User, bool>> filter = new List<Func<User, bool>>() { x => x.Id == x.Id };
            var response = await _userRepository.GetAsync(filter,page,take);
            if (!response.Success) return BadRequest(response);
            return Ok(response);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("{id}")]
        public async Task<ActionResult<GetResponseDto<TokenInfo>>> Get(string id)
        {
            var response = await _userRepository.GetByIdAsync(id);
            if (!response.Success) return BadRequest(response);
            return Ok(response);
        }


        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpDelete("{id}")]
        public async Task<ActionResult<GetResponseDto<TokenInfo>>> Delete(string id,[FromQuery] string password)
        {
            var response = await _userRepository.DeleteAsync(new UserDeleteDto() { Id = id, Password = password});
            if (!response.Success) return BadRequest(response);
            return Ok(response);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPut]
        public async Task<ActionResult<PostResponseDto<UserGetDto>>> Update(UserUpdateDto userUpdateDto)
        {
            var response = await _userRepository.UpdateAsync(userUpdateDto);
            if (!response.Success) return BadRequest(response);
            return Ok(response);
        }

        


    }
}
