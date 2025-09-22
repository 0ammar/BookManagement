using Application.DTOs;

namespace Application.Interfaces
{
    public interface IBookService
    {
        Task<IEnumerable<BookDto>> GetAllBooksWithCategoriesAsync();
        Task<IEnumerable<BookDto>> GetBooksByCategoryIdAsync(int categoryId);
        Task<BookDto?> GetBookByIdAsync(int id);
        Task<BookDto> AddBookAsync(int categoryId, CreateBookDto createBookDto);
        Task UpdateBookAsync(int id, BookDto bookDto);
        Task DeleteBookAsync(int id);
    }
}