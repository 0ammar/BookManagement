using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ValueObjects
{
    public class ISBN
    {
        public string Value { get; private set; }

        public ISBN(string value)
        {
            if (!IsValid(value))
                throw new ArgumentException("Invalid ISBN format");
            Value = value;
        }


        private bool IsValid(string isbn)
        {
            return !string.IsNullOrEmpty(isbn) && (isbn.Length == 10 || isbn.Length == 13);
        }

        public override string ToString() => Value;
    }
}
