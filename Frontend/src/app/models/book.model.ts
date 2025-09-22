import { Category } from "./category.model";

export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publicationDate: string;
  categories: Category[];
}

export interface CreateBookRequest {
  title: string;
  author: string;
  isbn: string;
  publicationDate: string;
}

export interface UpdateBookRequest {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publicationDate: string;
  categories: Category[];
}
