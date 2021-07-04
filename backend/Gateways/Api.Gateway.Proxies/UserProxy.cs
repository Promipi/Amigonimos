using Api.Gateway.Proxies.Config;
using Common.Collection;
using Common.Responses;
using Identity.Domain;
using Identity.Domain.Auth;
using Identity.Domain.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;

namespace Api.Gateway.Proxies
{
    public interface IUserProxy
    {
        public Task<GetResponseDto<DataCollection<User>>> GetAsync(int page, int take);

        public Task<GetResponseDto<TokenInfo>> CreateUserAsync(UserCreateDto userCreateDto);

        public Task<GetResponseDto<TokenInfo>> LoginAsync(LoginDto loginDto);

        public Task<PostResponseDto<User>> UpdateAsync(UserUpdateDto userUpdateDto);

        public Task<DeleteResponseDto> DeleteAsync(string id,string password);

        public Task<GetResponseDto<User>> GetByIdAsync(string userId);
    }

    public class UserProxy : IUserProxy
    {
        private readonly IOptions<ApiUrls> _apiUrls;
        private readonly HttpClient _httpClient;

        public UserProxy(HttpClient httpClient, IOptions<ApiUrls> apiUrls,IHttpContextAccessor httpContextAccessor)
        {
            _apiUrls = apiUrls; _httpClient = httpClient; _httpClient.AddBearerToken(httpContextAccessor);
        }

        public async Task<GetResponseDto<TokenInfo>> CreateUserAsync(UserCreateDto userCreateDto)
        {
            var request = await _httpClient.PostAsJsonAsync($"{_apiUrls.Value.IdentityApi}/api/users/signUp", userCreateDto); 
            request.EnsureSuccessStatusCode();
            var response = JsonConvert.DeserializeObject<GetResponseDto<TokenInfo>>(await request.Content.ReadAsStringAsync());
            return response;
        }

        public async Task<DeleteResponseDto> DeleteAsync(string id,string password)
        {
            var request = await _httpClient.DeleteAsync($"{_apiUrls.Value.IdentityApi}/api/users/{id}?password={password}");
            request.EnsureSuccessStatusCode();
            var response = JsonConvert.DeserializeObject<DeleteResponseDto>(await request.Content.ReadAsStringAsync());
            return response;
        }

        public async Task<GetResponseDto<DataCollection<User>>> GetAsync(int page, int take)
        {
            var request = await _httpClient.GetAsync($"{_apiUrls.Value.IdentityApi}/api/users?page={page}&take={take}"); 
            request.EnsureSuccessStatusCode();
            var response = JsonConvert.DeserializeObject<GetResponseDto<DataCollection<User>>>(await request.Content.ReadAsStringAsync());
            return response;
        }

        public async Task<GetResponseDto<User>> GetByIdAsync(string userId)
        {
            var request = await _httpClient.GetAsync($"{_apiUrls.Value.IdentityApi}/api/users/{userId}"); 
            request.EnsureSuccessStatusCode();
            var response = JsonConvert.DeserializeObject<GetResponseDto<User>>(await request.Content.ReadAsStringAsync());
            return response;
        }

        public async Task<GetResponseDto<TokenInfo>> LoginAsync(LoginDto loginDto)
        {
            var request = await _httpClient.PostAsJsonAsync($"{_apiUrls.Value.IdentityApi}/api/users/login",loginDto); //post an new user "SIGNUP"
            request.EnsureSuccessStatusCode();
            var response = JsonConvert.DeserializeObject<GetResponseDto<TokenInfo>>(await request.Content.ReadAsStringAsync());
            return response;
        }

        public async Task<PostResponseDto<User>> UpdateAsync(UserUpdateDto userUpdateDto)
        {
            var request = await _httpClient.PutAsJsonAsync($"{_apiUrls.Value.ProblemApi}/api/users",userUpdateDto); //post an new user "SIGNUP"
            request.EnsureSuccessStatusCode();
            var response = JsonConvert.DeserializeObject<PostResponseDto<User>>(await request.Content.ReadAsStringAsync());
            return response;
        }
    }
}
