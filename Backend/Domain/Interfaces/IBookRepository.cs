using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IBookRepository
    {
        Task<IEnumerable<Book>> GetAllBooksWithCategoriesAsync();
        Task<IEnumerable<Book>> GetBooksByCategoryIdAsync(int categoryId);
        Task<Book?> GetBookByIdAsync(int id);

        Task<Book> AddBookAsync(Book book);
        Task UpdateBookAsync(Book book);
        Task DeleteBookAsync(int id);  
        Task<bool> ExistsAsync(int id);
    }
}
