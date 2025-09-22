using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.Repositories
{
    public class CategoryRepository(ApplicationDbContext context) : ICategoryRepository
    {
        private readonly ApplicationDbContext _context = context;

        public async Task<IEnumerable<Category>> GetAllCategoriesAsync() =>
            await _context.Categories.AsNoTracking().ToListAsync();

        public async Task<Category?> GetCategoryByIdAsync(int id)
        {
            return await _context.Categories
                                 .AsNoTracking()
                                 .FirstOrDefaultAsync(c => c.Id == id); 
        }


        public async Task<Category> AddCategoryAsync(Category category)
        {
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
            return category;
        }

        public async Task UpdateCategoryAsync(Category category)
        {
            if (!await ExistsAsync(category.Id))
                throw new KeyNotFoundException($"No category found with Id: {category.Id}");
            _context.Categories.Update(category);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteCategoryAsync(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
                throw new KeyNotFoundException($"No category found with Id: {id}");
            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> ExistsAsync(int id) =>
            await _context.Categories.AnyAsync(c => c.Id == id);
    }
}