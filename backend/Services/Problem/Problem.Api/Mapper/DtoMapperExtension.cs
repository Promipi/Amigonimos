using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Problem.Api.Mapper
{
    public static class DtoMapperExtension
    {
        public static T MapTo<T>(this object value)
        {
            return JsonConvert.DeserializeObject<T>(
                JsonConvert.SerializeObject(value)
            );
        }
    }
}
