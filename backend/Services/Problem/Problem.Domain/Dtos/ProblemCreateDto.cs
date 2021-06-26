using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Problem.Domain.Dtos
{
    public class ProblemCreateDto
    {
        public string Title { get; set; }

        public string Content { get; set; }

        public DateTime CreationDate { get; set; }

        public string OwnerId { get; set; }
    }
}
