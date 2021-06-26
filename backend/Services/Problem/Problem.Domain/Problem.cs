using System;

namespace Problem.Domain
{
    public class Problem
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();

        public string Title { get; set; }

        public string Content { get; set; }

        public DateTime CreationDate { get; set; }

        public string OwnerId { get; set; }
    }
}
