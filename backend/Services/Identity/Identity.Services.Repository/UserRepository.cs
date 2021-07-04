using AutoMapper;
using Common.Collection;
using Common.Responses;
using Identity.Domain;
using Identity.Domain.Auth;
using Identity.Domain.DTOs;
using Identity.Persistece.Database;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Problem.Domain.Auth;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Identity.Services.Repository
{
    public class UserRepository : IUserRepository
    {
        private UserManager<User> _userManager;
        private SignInManager<User> _signInManager;
        private IMapper _mapper;
        private UserDbContext _context;
        private IConfiguration _configuration;

        public UserRepository(UserDbContext context, UserManager<User> userManager , SignInManager<User> signInManager,IMapper mapper,IConfiguration configuration)
        {
            _userManager = userManager; _signInManager = signInManager; _mapper = mapper;
            _context = context; _configuration = configuration;
        }

        public async Task<GetResponseDto<TokenInfo>> CreateUser(UserCreateDto userCreateDto)
        {
            var response = new GetResponseDto<TokenInfo>();
            var user = _mapper.Map<User>(userCreateDto);
            var result = await _userManager.CreateAsync(user, userCreateDto.Password);

            if (result.Succeeded)
            {
                response.Success = true;
                response.Content = await BuildToken(user); 
            }
            else
            {
                result.Errors.ToList().ForEach(x =>
                {
                    response.Message += x.Description + "\n";
                });
            }
            return response;
        }

        public async Task<GetResponseDto<TokenInfo>> Login(LoginDto loginDto)
        {
            var response = new GetResponseDto<TokenInfo>();
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user == null)
            {
                response.Message = "Invalid Credetianls";
            }

            var result = await _signInManager.PasswordSignInAsync(user,loginDto.Password, false, true);
            if (result.IsLockedOut) response.Message = "Your acoount is locked for any rason";
            if(result.Succeeded)
            {
                response.Success = true; response.Content = await BuildToken(user);
            }
            else
            {
                response.Message = "Invalid Credentials";
            }
            return response;
        }


        public async Task<DeleteResponseDto> DeleteAsync(UserDeleteDto userDeleteDto)
        {
            var response = new DeleteResponseDto();
            var user = await _userManager.FindByIdAsync(userDeleteDto.Id);
            if (user == null)
            {
                response.Message = "Invalid Credetianls";
            }

            var result = await _signInManager.PasswordSignInAsync(user,userDeleteDto.Password, false, true);
            if (result.IsLockedOut) response.Message = "Your acoount is locked for any rason";

            if (result.Succeeded)
            {
                response.Success = true; response.Message = "User Deleted";
                await _userManager.DeleteAsync(new User() { Id = userDeleteDto.Id }); await _context.SaveChangesAsync();
            }
            else
            {
                response.Message = "Invalid Credentials";
            }      
            return response;
        }

        public async Task<GetResponseDto<DataCollection<User>>> GetAsync(List<Func<User, bool>> filter, int page, int take)
        {
            throw new NotImplementedException();
        }

        public async Task<GetResponseDto<User>> GetByIdAsync(string id)
        {
            var response = new GetResponseDto<User>();
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                response.Message = "The user doesn't exist";
            }
            else
            {
                response.Success = true; response.Content = user;
            }
            return response;
        }

       
        public async Task<PostResponseDto<User>> UpdateAsync(UserUpdateDto helpUpdateDto)
        {
            var response = new PostResponseDto<User>();
            try
            {
                var result = _context.Users.Update(_mapper.Map<User>(helpUpdateDto));
                response.Success = true; response.Entity = result.Entity; 
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
            }
            return response;
        }


        private async Task<TokenInfo> BuildToken(User userInfo)
        {
            var claims = new List<Claim> //the claims are created
            {
                new Claim("user_id",userInfo.Id),
                new Claim(JwtRegisteredClaimNames.UniqueName,userInfo.UserName),
            };

            foreach (var role in await _userManager.GetRolesAsync(userInfo))
            {
                claims.Add(new Claim(ClaimTypes.Role, role)); //user roles have be added
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["api_key"])); //for now the private key is matita
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var expiration = DateTime.UtcNow.AddDays(1);

            JwtSecurityToken token = new JwtSecurityToken(
               issuer: null,
               audience: null,
               claims: claims,
               expires: expiration,
               signingCredentials: creds
            );

            return (new TokenInfo
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expiration = expiration
            }); //return the info token
        }
    }
}
