using System;

namespace Application.DTOs
{
    public class CreateBookDto
    {
        public string Title { get; set; } = default!;
        public string Author { get; set; } = default!;
        public string ISBN { get; set; } = default!;
        public DateTime PublicationDate { get; set; }
    }
}