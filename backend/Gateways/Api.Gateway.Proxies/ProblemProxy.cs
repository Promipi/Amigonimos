using Api.Gateway.Proxies.Config;
using Common.Collection;
using Common.Responses;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Problem.Domain.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Api.Gateway.Proxies
{
    public interface IProblemProxy
    {
        public Task<GetResponseDto<DataCollection<Problem.Domain.Problem>>> GetAsync(int page, int take,string ownerId="",DateTime createDate = default);

        public Task<PostResponseDto<Problem.Domain.Problem>> AddAsync(ProblemCreateDto helpCreateDto);

        public Task<PostResponseDto<Problem.Domain.Problem>> UpdateAsync(ProblemUpdateDto helpUpdateDto);

        public Task<DeleteResponseDto> DeleteAsync(string helpId);

        public Task<GetResponseDto<Problem.Domain.Problem>> GetByIdAsync(string helpId);
    }
    public class ProblemProxy : IProblemProxy
    {
        private readonly IOptions<ApiUrls> _apiUrls;
        private readonly HttpClient _httpClient;

        public ProblemProxy(HttpClient httpClient, IOptions<ApiUrls> apiUrls,IHttpContextAccessor httpContextAccessor)
        {
            _apiUrls = apiUrls; _httpClient = httpClient; _httpClient.AddBearerToken(httpContextAccessor);
        }

        public async Task<PostResponseDto<Problem.Domain.Problem>> AddAsync(ProblemCreateDto helpCreateDto)
        {
            var request = await _httpClient.PostAsJsonAsync($"{_apiUrls.Value.ProblemApi}/api/problems/",helpCreateDto); //post an new problem create
            request.EnsureSuccessStatusCode();
            var response = JsonConvert.DeserializeObject<PostResponseDto<Problem.Domain.Problem>>(await request.Content.ReadAsStringAsync());
            return response;
        }

        public async Task<DeleteResponseDto> DeleteAsync(string helpId)
        {
            var request = await _httpClient.DeleteAsync($"{_apiUrls.Value.ProblemApi}/api/problems/{helpId}");
            request.EnsureSuccessStatusCode();
            var response = JsonConvert.DeserializeObject<DeleteResponseDto>(await request.Content.ReadAsStringAsync());
            return response;
        }

        public async Task<GetResponseDto<DataCollection<Problem.Domain.Problem>>> GetAsync(int page = 1, int take = 10, string ownerId = null, DateTime creationDate = default)
        {
            var request = await _httpClient.GetAsync($"{_apiUrls.Value.ProblemApi}/api/problems?page={page}&take={take}&ownerId={ownerId}&creationDate={creationDate}");
            request.EnsureSuccessStatusCode();
            var response = JsonConvert.DeserializeObject<GetResponseDto<DataCollection<Problem.Domain.Problem>>>(await request.Content.ReadAsStringAsync());
            return response;
        }

        public async Task<GetResponseDto<Problem.Domain.Problem>> GetByIdAsync(string id)
        {
            var request = await _httpClient.GetAsync($"{_apiUrls.Value.ProblemApi}/api/problems/{id}");
            request.EnsureSuccessStatusCode();
            var response = JsonConvert.DeserializeObject<GetResponseDto<Problem.Domain.Problem>>(await request.Content.ReadAsStringAsync());
            return response;
        }

        public async Task<PostResponseDto<Problem.Domain.Problem>> UpdateAsync(ProblemUpdateDto helpUpdateDto)
        {
            var request = await _httpClient.PutAsJsonAsync($"{_apiUrls.Value.ProblemApi}/api/problems", helpUpdateDto);
            request.EnsureSuccessStatusCode();
            var response = JsonConvert.DeserializeObject<PostResponseDto<Problem.Domain.Problem>>(await request.Content.ReadAsStringAsync());
            return response;
        }
    }
}
