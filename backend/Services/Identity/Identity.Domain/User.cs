using Microsoft.AspNetCore.Identity;
using System;

namespace Identity.Domain
{
    public class User : IdentityUser
    {
        public bool PublicProblems { get; set; }

        public bool PublicHelps { get; set; }

        public bool PublicTips { get; set; }
    }
}
