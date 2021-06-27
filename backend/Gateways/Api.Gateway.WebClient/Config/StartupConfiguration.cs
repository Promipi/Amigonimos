using Api.Gateway.Proxies;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Gateway.WebClient.Config
{
    public static class StartUpConfiguration
    {
        public static class ModeTypes
        {
            public static readonly string Local = "Local";
            public static readonly string Hosted = "Hosted";
        }
        public static IServiceCollection AddAppsettingBinding(this IServiceCollection service, IConfiguration configuration,string mode)
        {
            service.Configure<ApiUrls>(opts => {
                opts.HelpApi = configuration[$"ApiUrls:{mode}:HelpApi"];
                opts.ProblemApi = configuration[$"ApiUrls:{mode}:ProblemApi"];
            });    
            return service;
        }

        public static IServiceCollection AddProxiesRegistration(this IServiceCollection service, IConfiguration configuration)
        {
            service.AddHttpContextAccessor();

            service.AddHttpClient<IProblemProxy, ProblemProxy>();
            service.AddHttpClient<IHelpProxy, HelpProxy>();

            return service;
        }
    }
      
}
