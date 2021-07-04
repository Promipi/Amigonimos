using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Identity.Domain.DTOs
{
    public class UserCreateDto 
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Username { get; set; }

        public bool PublicProblems { get; set; }

        public bool PublicHelps { get; set; }

        public bool PublicTips { get; set; }

        
    }
}
