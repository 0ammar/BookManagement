using System.Net;
using Application.DTOs;
using Application.Interfaces;
using Domain.Entities;
using Domain.Interfaces;
using Domain.ValueObjects;

namespace Application.Services
{
    public class BookService(IBookRepository bookRepository, ICategoryRepository categoryRepository) : IBookService
    {
        private readonly IBookRepository _bookRepository = bookRepository;
        private readonly ICategoryRepository _categoryRepository = categoryRepository;


        public async Task<IEnumerable<BookDto>> GetAllBooksWithCategoriesAsync()
        {
            var books = await _bookRepository.GetAllBooksWithCategoriesAsync();
            return books.Select(MapToDto);
        }

        public async Task<IEnumerable<BookDto>> GetBooksByCategoryIdAsync(int categoryId)
        {
            var books = await _bookRepository.GetBooksByCategoryIdAsync(categoryId);
            return books.Select(b => new BookDto
            {
                Id = b.Id,
                Title = b.Title,
                Author = b.Author,
                ISBN = b.ISBN.Value,
                PublicationDate = b.PublicationDate,
                Categories = b.Categories.Select(c => new CategoryDto { Name = c.Name }).ToList()
            });
        }

        public async Task<BookDto?> GetBookByIdAsync(int id)
        {
            var book = await _bookRepository.GetBookByIdAsync(id);
            return book == null ? null : MapToDto(book);
        }

        public async Task<BookDto> AddBookAsync(int categoryId, CreateBookDto createBookDto)
        {

            var existingCategory = await _categoryRepository.GetCategoryByIdAsync(categoryId);

            if (existingCategory == null)
            {
                throw new KeyNotFoundException($"Category with id {categoryId} not found.");
            }

            var book = new Book(
                createBookDto.Title,
                createBookDto.Author,
                new ISBN(createBookDto.ISBN),
                createBookDto.PublicationDate
            );

            book.AddCategory(existingCategory);

            var added = await _bookRepository.AddBookAsync(book);

            return new BookDto
            {
                Id = added.Id,
                Title = added.Title,
                Author = added.Author,
                ISBN = added.ISBN.Value,
                PublicationDate = added.PublicationDate,
                Categories = added.Categories.Select(c => new CategoryDto { Id = c.Id, Name = c.Name }).ToList()
            };
        }

        public async Task UpdateBookAsync(int id, BookDto bookDto)
        {
            var existingBook = await _bookRepository.GetBookByIdAsync(id);
            if (existingBook == null)
            {
                throw new KeyNotFoundException($"Book with id {id} not found.");
            }

            existingBook.UpdateBook(
                bookDto.Title,
                bookDto.Author,
                new ISBN(bookDto.ISBN),
                bookDto.PublicationDate
            );
            await _bookRepository.UpdateBookAsync(existingBook);
        }

        public async Task DeleteBookAsync(int id) =>
            await _bookRepository.DeleteBookAsync(id);

        private static BookDto MapToDto(Book book) => new()
        {
            Id = book.Id,
            Title = book.Title,
            Author = book.Author,
            ISBN = book.ISBN.Value,
            PublicationDate = book.PublicationDate,
            Categories = book.Categories.Select(c => new CategoryDto { Name = c.Name }).ToList()
        };
    }
}