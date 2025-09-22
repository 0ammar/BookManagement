using Application.DTOs;
using Application.Interfaces;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.Services
{
    public class CategoryService(ICategoryRepository categoryRepository) : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository = categoryRepository;

        public async Task<IEnumerable<CategoryResponseDto>> GetAllCategoriesAsync()
        {
            var categories = await _categoryRepository.GetAllCategoriesAsync();
            return categories.Select(c => new CategoryResponseDto
            {
                Id = c.Id,
                Name = c.Name
            });
        }

        public async Task<CategoryResponseDto?> GetCategoryByIdAsync(int id)
        {
            var category = await _categoryRepository.GetCategoryByIdAsync(id);
            return category == null ? null : new CategoryResponseDto
            {
                Id = category.Id,  
                Name = category.Name
            };
        }

        public async Task<CategoryResponseDto> AddCategoryAsync(CategoryDto categoryDto)
        {
            var category = new Category(categoryDto.Name);

            var added = await _categoryRepository.AddCategoryAsync(category);

            return new CategoryResponseDto
            {
                Id = added.Id,
                Name = added.Name
            };
        }

        public async Task UpdateCategoryAsync(int id, CategoryDto categoryDto)
        {
            var existing = await _categoryRepository.GetCategoryByIdAsync(id);
            if (existing == null)
                throw new KeyNotFoundException($"Category with id {id} not found.");

            existing.UpdateCategory(categoryDto.Name);
            await _categoryRepository.UpdateCategoryAsync(existing);
        }

        public async Task DeleteCategoryAsync(int id) =>
            await _categoryRepository.DeleteCategoryAsync(id);
    }
}