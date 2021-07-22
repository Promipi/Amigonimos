using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Identity.Domain.DTOs
{
    public class UserGetDto
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public bool PublicProblems { get; set; }
        public bool PublicHelps { get; set; }
        public bool PublicTips { get; set; }
    }
}
