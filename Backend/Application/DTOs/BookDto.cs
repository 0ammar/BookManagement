using System;

namespace Application.DTOs
{
    public class BookDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = default!;
        public string Author { get; set; } = default!;
        public string ISBN { get; set; } = default!;
        public DateTime PublicationDate { get; set; }
        public List<CategoryDto> Categories { get; set; } = [];
    }
}