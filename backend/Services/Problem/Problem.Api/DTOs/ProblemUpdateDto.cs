﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Problem.Api.DTOs
{
    public class ProblemUpdateDto
    {
        public string Id { get; set; }
        public string Title { get; set; }

        public string Content { get; set; }
    }
}
