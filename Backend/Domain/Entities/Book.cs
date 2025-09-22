using Domain.ValueObjects;

namespace Domain.Entities
{
    public class Book
    {
        public int Id { get; private set; }
        public string Title { get; private set; }
        public string Author { get; private set; }
        public ISBN ISBN { get; private set; }
        public DateTime PublicationDate { get; private set; }
        public virtual ICollection<Category> Categories { get; private set; } = new List<Category>();


        protected Book() { }

        public Book(int id, string title, string author, ISBN isbn, DateTime publicationDate)
        {
            Id = id; 
            Title = title ?? throw new ArgumentNullException(nameof(title));
            Author = author ?? throw new ArgumentNullException(nameof(author));
            ISBN = isbn ?? throw new ArgumentNullException(nameof(isbn));
            PublicationDate = publicationDate;
        }

        public Book(string title, string author, ISBN isbn, DateTime publicationDate)
        {
            Title = title ?? throw new ArgumentNullException(nameof(title));
            Author = author ?? throw new ArgumentNullException(nameof(author));
            ISBN = isbn ?? throw new ArgumentNullException(nameof(isbn));
            PublicationDate = publicationDate;
        }


        public void UpdateBook(string title, string author, ISBN isbn, DateTime publicationDate)
        {
            Title = title ?? throw new ArgumentNullException(nameof(title));
            Author = author ?? throw new ArgumentNullException(nameof(author));
            ISBN = isbn ?? throw new ArgumentNullException(nameof(isbn));
            PublicationDate = publicationDate;
        }

        public void AddCategory(Category category)
        {
            if (category == null)
                throw new ArgumentNullException(nameof(category));
            if (!Categories.Contains(category))
                Categories.Add(category);
        }

        public void DeleteCategory(Category category)
        {
            if (category == null)
                throw new ArgumentNullException(nameof(category));
            Categories.Remove(category);
        }
    }
}