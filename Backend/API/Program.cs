using Microsoft.EntityFrameworkCore;
using Infrastructure.Data;
using Infrastructure.Repositories;
using Application.Interfaces;
using Application.Services;
using Domain.Interfaces;
using Microsoft.OpenApi.Models;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

// Database
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Repositories
builder.Services.AddScoped<IBookRepository, BookRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();

// Services
builder.Services.AddScoped<IBookService, BookService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// Swagger
builder.Services.AddSwaggerGen(options =>
{
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    options.IncludeXmlComments(xmlPath);
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "Library API", Version = "v1" });
});

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "Library API V1");
        options.RoutePrefix = string.Empty;
    });
}

app.UseCors("AllowAll");       
app.UseAuthorization();       
app.MapControllers();
app.Run();
