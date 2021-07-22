using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Help.Domain.DTOs
{
    public class HelpCreateDto
    {
        public string Content { get; set; }

        public string ProblemId { get; set; }// what problem does it belong to

        public DateTime CreationDate { get; set; }

        public string OwnerUsername { get; set; }
    
        public string OwnerId { get; set; }
    }
}
