#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["Services/Help/Help.Api/Help.Api.csproj", "Services/Help/Help.Api/"]
COPY ["Services/Help/Help.Services.Repository/Help.Services.Repository.csproj", "Services/Help/Help.Services.Repository/"]
COPY ["Common/Common.Collection/Common.Collection.csproj", "Common/Common.Collection/"]
COPY ["Common/Common.Responses/Common.Responses.csproj", "Common/Common.Responses/"]
COPY ["Services/Help/Help.Domain/Help.Domain.csproj", "Services/Help/Help.Domain/"]
COPY ["Services/Help/Help.Persistence.Database/Help.Persistence.Database.csproj", "Services/Help/Help.Persistence.Database/"]
COPY ["Common/Common.Paging/Common.Paging.csproj", "Common/Common.Paging/"]
RUN dotnet restore "Services/Help/Help.Api/Help.Api.csproj"
COPY . .
WORKDIR "/src/Services/Help/Help.Api"
RUN dotnet build "Help.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Help.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Help.Api.dll"]