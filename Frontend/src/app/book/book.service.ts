// BookService.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book, CreateBookRequest, UpdateBookRequest } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private http = inject(HttpClient);
  private baseUrl = 'http://192.168.10.79:5006/api';

  getBooksByCategoryId(categoryId: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/categories/${categoryId}/books`);
  }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/books`);
  }

  getById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/books/${id}`);
  }


  addBookToCategory(categoryId: number, bookData: CreateBookRequest): Observable<Book> {
    return this.http.post<Book>(`${this.baseUrl}/categories/${categoryId}/books`, bookData);
  }

  update(bookId: number, bookData: UpdateBookRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/books/${bookId}`, bookData);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/books/${id}`);
  }
}
