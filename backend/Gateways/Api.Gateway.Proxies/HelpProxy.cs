using Api.Gateway.Proxies.Config;
using Common.Collection;
using Common.Responses;
using Help.Domain.DTOs;
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
    public interface IHelpProxy
    {
        public Task<GetResponseDto<DataCollection<Help.Domain.Help>>> GetAsync(int page, int take, string problemId = "", string ownerId = "");

        public Task<PostResponseDto<Help.Domain.Help>> AddAsync(HelpCreateDto helpCreateDto);

        public Task<PostResponseDto<Help.Domain.Help>> UpdateAsync(HelpUpdateDto helpUpdateDto);

        public Task<DeleteResponseDto> DeleteAsync(string helpId);

        public Task<GetResponseDto<Help.Domain.Help>> GetByIdAsync(string helpId);
    }
    public class HelpProxy : IHelpProxy
    {
        private readonly IOptions<ApiUrls> _apiUrls;
        private readonly HttpClient _httpClient;

        public HelpProxy (HttpClient httpClient, IOptions<ApiUrls> apiUrls, IHttpContextAccessor httpContextAccessor)
        {
            _apiUrls = apiUrls; _httpClient = httpClient; _httpClient.AddBearerToken(httpContextAccessor);
        }

        public async Task<PostResponseDto<Help.Domain.Help>> AddAsync(HelpCreateDto helpCreateDto)
        {
            var request = await _httpClient.PostAsJsonAsync($"{_apiUrls.Value.HelpApi}/api/helps/", helpCreateDto); //post an new problem create
            request.EnsureSuccessStatusCode();
            var response = JsonConvert.DeserializeObject<PostResponseDto<Help.Domain.Help>>(await request.Content.ReadAsStringAsync());
            return response;
        }

        public async Task<DeleteResponseDto> DeleteAsync(string helpId)
        {
            var request = await _httpClient.DeleteAsync($"{_apiUrls.Value.HelpApi}/api/helps/{helpId}");
            request.EnsureSuccessStatusCode();
            var response = JsonConvert.DeserializeObject<DeleteResponseDto>(await request.Content.ReadAsStringAsync());
            return response;
        }

        public async Task<GetResponseDto<DataCollection<Help.Domain.Help>>> GetAsync(int page = 1, int take = 10, string problemId = "", string ownerId = "")
        {
            var request = await _httpClient.GetAsync($"{_apiUrls.Value.HelpApi}/api/helps?page={page}&take={take}&problemId={problemId}&ownerId={ownerId}");
            request.EnsureSuccessStatusCode();
            var response = JsonConvert.DeserializeObject<GetResponseDto<DataCollection<Help.Domain.Help>>>(await request.Content.ReadAsStringAsync());
            return response;
        }

        public async Task<GetResponseDto<Help.Domain.Help>> GetByIdAsync(string id)
        {
            var request = await _httpClient.GetAsync($"{_apiUrls.Value.HelpApi}/api/helps/{id}");
            request.EnsureSuccessStatusCode();
            var response = JsonConvert.DeserializeObject<GetResponseDto<Help.Domain.Help>>(await request.Content.ReadAsStringAsync());
            return response;
        }

        public async Task<PostResponseDto<Help.Domain.Help>> UpdateAsync(HelpUpdateDto helpUpdateDto)
        {
            var request = await _httpClient.PutAsJsonAsync($"{_apiUrls.Value.HelpApi}/api/helps", helpUpdateDto);
            request.EnsureSuccessStatusCode();
            var response = JsonConvert.DeserializeObject<PostResponseDto<Help.Domain.Help>>(await request.Content.ReadAsStringAsync());
            return response;
        }
    }
}
