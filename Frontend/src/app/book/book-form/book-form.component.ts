import { CreateBookRequest } from '../../models/book.model';
import { UpdateBookRequest } from '../../models/book.model';
import { Book } from '../../models/book.model';
import { BookService } from '../book.service';

import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-book-form',
  standalone: true,
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class BookFormComponent implements OnInit {
  bookForm!: FormGroup;
  isEdit = false;
  
  constructor(
    private fb: FormBuilder,
    private service: BookService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<BookFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { book?: Book; categoryId: number }
  ) {}

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      isbn: ['', Validators.required],
      publicationDate: ['', Validators.required],
    });

    if (this.data?.book) {
      this.isEdit = true;
      this.bookForm.patchValue({
        title: this.data.book.title,
        author: this.data.book.author,
        isbn: this.data.book.isbn,
        publicationDate: new Date(this.data.book.publicationDate),
      });
    }
  }

  submit(): void {
    if (this.bookForm.invalid) return;

    const bookData: CreateBookRequest = {
      title: this.bookForm.value.title,
      author: this.bookForm.value.author,
      isbn: this.bookForm.value.isbn,
      publicationDate: this.bookForm.value.publicationDate.toISOString(),
    };

    if (this.isEdit && this.data.book) {
      const updateData: UpdateBookRequest = {
        id: this.data.book.id!,
        title: bookData.title,
        author: bookData.author,
        isbn: bookData.isbn,
        publicationDate: bookData.publicationDate,
        categories: this.data.book.categories
      };
      this.service.update(this.data.book.id!, updateData).subscribe({
        next: () => this.onSuccess('Book updated successfully!'),
        error: () => this.onError('Error updating book.'),
      });
    } else {
      this.service.addBookToCategory(this.data.categoryId, bookData).subscribe({
        next: () => this.onSuccess('Book created successfully!'),
        error: () => this.onError('Error creating book.'),
      });
    }
  }

  onSuccess(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 2000 });
    this.dialogRef.close(true);
  }

  onError(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 2000 });
  }

  close(): void {
    this.dialogRef.close();
  }
}
