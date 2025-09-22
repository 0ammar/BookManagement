using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Category
    {
        public int Id { get; private set; }
        public string Name { get; private set; }
        public virtual ICollection<Book> Books { get; private set; } = new List<Book>();


        protected Category() { }

        public Category(string name)
        {
            Name = name ?? throw new ArgumentNullException(nameof(name));
        }


        public void UpdateCategory(string name)
        {
            Name = name ?? throw new ArgumentNullException(nameof(name)); 
        }
    }
}
