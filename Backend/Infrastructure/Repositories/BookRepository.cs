using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Data;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Data;

namespace Infrastructure.Repositories
{
    public class BookRepository(ApplicationDbContext context, IConfiguration configuration) : IBookRepository
    {
        private readonly ApplicationDbContext _context = context;
        private readonly string _connectionString = configuration.GetConnectionString("DefaultConnection")!;


        public async Task<IEnumerable<Book>> GetAllBooksWithCategoriesAsync()
        {
            var books = new Dictionary<int, Book>(); 
            using var conn = new SqlConnection(_connectionString);
            await conn.OpenAsync();

            using var cmd = new SqlCommand("GetAllBooksWithCategories", conn)
            {
                CommandType = CommandType.StoredProcedure
            };

            using var reader = await cmd.ExecuteReaderAsync();
            while (await reader.ReadAsync())
            {
                var bookId = Convert.ToInt32(reader["BookId"]);

                if (!books.ContainsKey(bookId))
                {
                    books[bookId] = new Book(
                        bookId,
                        reader["Title"].ToString()!,
                        reader["Author"].ToString()!,
                        new Domain.ValueObjects.ISBN(reader["ISBN"].ToString()!),
                        (DateTime)reader["PublicationDate"]
                    );
                }

                var categoryName = reader["CategoryName"].ToString();
                if (!string.IsNullOrEmpty(categoryName))
                {
                    if (!books[bookId].Categories.Any(c => c.Name == categoryName))
                    {
                        books[bookId].AddCategory(new Category(categoryName));
                    }
                }
            }

            return books.Values.ToList();
        }

        public async Task<IEnumerable<Book>> GetBooksByCategoryIdAsync(int categoryId)
        {
            return await _context.Books
                .Include(b => b.Categories)
                .Where(b => b.Categories.Any(c => c.Id == categoryId))
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<Book?> GetBookByIdAsync(int id) =>
            await _context.Books.Include(b => b.Categories).FirstOrDefaultAsync(b => b.Id == id);


        public async Task<Book> AddBookAsync(Book book)
        {
            foreach (var category in book.Categories)
            {
                _context.Categories.Attach(category);
            }

            _context.Books.Add(book);
            await _context.SaveChangesAsync();
            return book;
        }

        public async Task UpdateBookAsync(Book book)
        {
            _context.Books.Update(book);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteBookAsync(int id)
        {
            if (!await ExistsAsync(id))
                throw new KeyNotFoundException($"Book with id {id} not found.");
            var book = await _context.Books.FindAsync(id);
            _context.Books.Remove(book!);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> ExistsAsync(int id) =>
            await _context.Books.AnyAsync(b => b.Id == id);
    }
}