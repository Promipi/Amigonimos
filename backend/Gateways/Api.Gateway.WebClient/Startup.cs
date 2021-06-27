using Api.Gateway.WebClient.Config;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
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
            services.AddAppsettingBinding(Configuration,ModeTypes.Local).AddProxiesRegistration(Configuration);

            services.AddControllers();
            services.AddSwaggerGen(setupAction =>
            {
                setupAction.SwaggerDoc("Problem.API", new OpenApiInfo 
                {
                    Title = "Problem.API", Version = "v1" , Description = "Through this API you can access the problems that people publish as well as insert, delete and filter them" ,
                    Contact = new OpenApiContact() { Email = "promipisharp@gmail.com", Name = "Promipi", Url = new Uri( "https://discord.gg/JqU4v28" ) }
                }); //problems.API specification

                setupAction.SwaggerDoc("Help.API", new OpenApiInfo()
                {
                    Title = "Help.API", Version = "v1" , Description = "Through this API you can access the help that pertain to a problem as well as edit, delete and create new ones.",
                    Contact = new OpenApiContact() { Email = "promipisharp@gmail.com", Name = "Promipi", Url = new Uri( "https://discord.gg/JqU4v28" ) }
                }); //helps.API specification
            });
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
                    "/swagger/Problem.API/swagger.json", "Problem.API");
                setupAction.SwaggerEndpoint(
                   "/swagger/Help.API/swagger.json", "Help.API");
            });

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
