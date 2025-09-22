using Application.DTOs;

namespace Application.Interfaces
{
    public interface ICategoryService
    {
        Task<IEnumerable<CategoryResponseDto>> GetAllCategoriesAsync();
        Task<CategoryResponseDto?> GetCategoryByIdAsync(int id);
        Task<CategoryResponseDto> AddCategoryAsync(CategoryDto categoryDto);
        Task UpdateCategoryAsync(int id, CategoryDto categoryDto);
        Task DeleteCategoryAsync(int id);
    }
}