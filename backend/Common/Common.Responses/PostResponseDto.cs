﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Responses
{
    public class PostResponseDto<T>
    {
        public bool Success { get; set; }

        public string Message { get; set; }

        public T ElementCreated { get; set; }
    }
}
