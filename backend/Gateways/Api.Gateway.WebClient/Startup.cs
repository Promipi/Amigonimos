using Api.Gateway.WebClient.Config;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Api.Gateway.WebClient.Config.StartUpConfiguration;

namespace Api.Gateway.WebClient
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAppsettingBinding(Configuration,ModeTypes.Hosted).AddProxiesRegistration(Configuration);

            services.AddControllers();

            services.AddSwaggerGen(setupAction =>
            {

                setupAction.SwaggerDoc("Identity.API", new OpenApiInfo()
                {
                    Title = "API.Gateway.Identity",
                    Version = "v1",
                    Description = "Through this API you can log in and register to be able to receive tokens and be able to make user requests and other services",
                    Contact = new OpenApiContact() { Email = "promipisharp@gmail.com", Name = "Promipi", Url = new Uri("https://discord.gg/JqU4v28") }
                }); //Identity.API specification

                setupAction.SwaggerDoc("Problem.API", new OpenApiInfo
                {
                    Title = "API.Gateway.Problem",
                    Version = "v1",
                    Description = "Through this API you can access the problems that people publish as well as insert, delete and filter them",
                    Contact = new OpenApiContact() { Email = "promipisharp@gmail.com", Name = "Promipi", Url = new Uri("https://discord.gg/JqU4v28") }
                }); //problems.API specification

                setupAction.SwaggerDoc("Help.API", new OpenApiInfo()
                {
                    Title = "API.Gateway.Help",
                    Version = "v1",
                    Description = "Through this API you can access the help that pertain to a problem as well as edit, delete and create new ones.",
                    Contact = new OpenApiContact() { Email = "promipisharp@gmail.com", Name = "Promipi", Url = new Uri("https://discord.gg/JqU4v28") }
                }); //helps.API specification

                setupAction.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = "JWT Authorization header using the Bearer scheme. Enter Bearer space and then your token in the text input below. Example: Bearer 12345abcdef ",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });

                setupAction.AddSecurityRequirement(new OpenApiSecurityRequirement()
                {
                    {
                        new OpenApiSecurityScheme
                            {
                                Reference = new OpenApiReference
                                {
                                    Type = ReferenceType.SecurityScheme,
                                    Id = "Bearer"
                                },
                                  Scheme = "oauth2",
                                  Name = "Bearer",
                                  In = ParameterLocation.Header,
                        },
                        new List<string>()
                      }
                    });
            });

            services.AddCors(setupAction => setupAction.AddPolicy("AmigonimoPolicy", builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            }));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).
            AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options => {
               options.TokenValidationParameters = new TokenValidationParameters()
               {
                   ValidateIssuer = false,
                   ValidateAudience = false,
                   ValidateLifetime = true,
                   ValidateIssuerSigningKey = true,
                   IssuerSigningKey = new SymmetricSecurityKey(
                   Encoding.UTF8.GetBytes(Configuration["api_key"])),
               };
            });

            services.AddAuthorization();

        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage(); 
            }

            app.UseSwagger();
            app.UseSwaggerUI(setupAction=> {
                setupAction.SwaggerEndpoint(
                 "/swagger/Identity.API/swagger.json", "Identity.API");
                setupAction.SwaggerEndpoint(
                    "/swagger/Problem.API/swagger.json", "Problem.API");
                setupAction.SwaggerEndpoint(
                   "/swagger/Help.API/swagger.json", "Help.API");
            });

            app.UseRouting();

            app.UseCors("AmigonimoPolicy");

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
