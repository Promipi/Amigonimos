﻿using Common.Collection;
using Common.Responses;
using Identity.Domain;
using Identity.Domain.Auth;
using Identity.Domain.DTOs;
using Problem.Domain.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Identity.Services.Repository
{
    public partial interface IUserRepository
    {
        public Task<GetResponseDto<DataCollection<User>>> GetAsync(List<Func<User, bool>> filter, int page, int take);

        public Task<PostResponseDto<User>> UpdateAsync(UserUpdateDto helpUpdateDto);

        public Task<DeleteResponseDto> DeleteAsync(UserDeleteDto userDeleteDto);

        public Task<GetResponseDto<User>> GetByIdAsync(string id);
    }

    public partial interface IUserRepository
    {
        public Task<GetResponseDto<TokenInfo>> Login(LoginDto loginDto);

        public Task<GetResponseDto<TokenInfo>> CreateUser(UserCreateDto userCreateDto);
    }
}
