using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Help.Domain
{
    public class Help
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();

        public string Content { get; set; }

        public string ProblemId { get; set; }// what problem does it belong to

        public string OwnerId { get; set; }

        public DateTime CreationDate { get; set; }
    }
}
