using Domain.Entities;

namespace Domain.Interfaces
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<Category>> GetAllCategoriesAsync();
        Task<Category?> GetCategoryByIdAsync(int id);

        Task<Category> AddCategoryAsync(Category category);
        Task UpdateCategoryAsync(Category category);
        Task DeleteCategoryAsync(int id);
        Task<bool> ExistsAsync(int id);
    }
}
