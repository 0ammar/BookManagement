using Microsoft.AspNetCore.Mvc;
using Application.DTOs;
using Application.Interfaces;

namespace API.Controllers
{

    /// <summary>
    /// Main API controller to manage books and categories.
    /// </summary>
    [ApiController]
    [Route("api")]
    public class MainController(ICategoryService categoryService, IBookService bookService) : ControllerBase
    {
        private readonly ICategoryService _categoryService = categoryService;
        private readonly IBookService _bookService = bookService;


        /// <summary>
        /// Get all books in a specific category by category id
        /// </summary>
        [HttpGet("categories/{categoryId}/books")]
        public async Task<IActionResult> GetBooksByCategoryId(int categoryId)
        {
            var books = await _bookService.GetBooksByCategoryIdAsync(categoryId);
            return Ok(books);
        }

        /// <summary>
        /// Get all categories.
        /// </summary>
        [HttpGet("categories")]
        public async Task<IActionResult> GetAllCategories()
        {
            var categories = await _categoryService.GetAllCategoriesAsync();
            return Ok(categories);
        }

        /// <summary>
        /// Get category by Id.
        /// </summary>
        [HttpGet("categories/{id:int}")]
        public async Task<IActionResult> GetCategoryById(int id)
        {
            var category = await _categoryService.GetCategoryByIdAsync(id);
            return category == null ? NotFound() : Ok(category);
        }

        /// <summary>
        /// Add a new category.
        /// </summary>
        [HttpPost("categories")]
        public async Task<IActionResult> AddCategory([FromBody] CategoryDto categoryDto)
        {
            if (string.IsNullOrWhiteSpace(categoryDto.Name))
                return BadRequest("Category name is required.");

            var created = await _categoryService.AddCategoryAsync(categoryDto);
            return CreatedAtAction(nameof(GetCategoryById), new { id = created.Id }, created);
        }


        /// <summary>
        /// Update a category by Id.
        /// </summary>
        [HttpPut("categories/{id:int}")]
        public async Task<IActionResult> UpdateCategory(int id, [FromBody] CategoryDto categoryDto)
        {
            try
            {
                await _categoryService.UpdateCategoryAsync(id, categoryDto);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound($"Category with id {id} not found.");
            }
        }

        /// <summary>
        /// Delete a category by Id.
        /// </summary>
        [HttpDelete("categories/{id:int}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            try
            {
                await _categoryService.DeleteCategoryAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound($"Category with id {id} not found.");
            }
        }

        /// <summary>
        /// Get all books with their categories.
        /// </summary>
        [HttpGet("books")]  
        public async Task<IActionResult> GetAllBooksWithCategories()
        {
            var books = await _bookService.GetAllBooksWithCategoriesAsync();
            return Ok(books);
        }

        /// <summary>
        /// Get book by Id.
        /// </summary>
        [HttpGet("books/{id:int}")]
        public async Task<IActionResult> GetBookById(int id)
        {
            var book = await _bookService.GetBookByIdAsync(id);
            return book == null ? NotFound() : Ok(book);
        }

        /// <summary>
        /// Add a new book to a specific category.
        /// </summary>
        [HttpPost("categories/{categoryId}/books")]
        public async Task<IActionResult> AddBookToCategory([FromRoute] int categoryId, [FromBody] CreateBookDto createBookDto)
        {
            if (string.IsNullOrWhiteSpace(createBookDto.Title) || string.IsNullOrWhiteSpace(createBookDto.ISBN))
                return BadRequest("Title and ISBN are required.");

            var created = await _bookService.AddBookAsync(categoryId, createBookDto);
            return CreatedAtAction(nameof(GetBookById), new { id = created.Id }, created);
        }

        /// <summary>
        /// Update a book by Id.
        /// </summary>
        [HttpPut("books/{id:int}")]
        public async Task<IActionResult> UpdateBook(int id, [FromBody] BookDto bookDto)
        {
            try
            {
                await _bookService.UpdateBookAsync(id, bookDto);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound($"Book with id {id} not found.");
            }
        }

        /// <summary>
        /// Delete a book by Id.
        /// </summary>
        [HttpDelete("books/{id:int}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            try
            {
                await _bookService.DeleteBookAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound($"Book with id {id} not found.");
            }
        }
    }
}
