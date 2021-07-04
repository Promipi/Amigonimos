using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Identity.Domain.DTOs
{
    public class UserUpdateDto
    {
        public string Id { get; set; }

        public string Username { get; set; }

        public bool PublicProblems { get; set; }

        public bool PublicHelps { get; set; }

        public bool PublicTips { get; set; }
    }
}
